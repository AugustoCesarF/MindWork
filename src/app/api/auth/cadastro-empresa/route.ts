import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cadastroEmpresaSchema } from '@/lib/validators/auth'
import { generateInviteCode, generateAnonymousCode } from '@/lib/utils'

// Use service role client to bypass RLS for admin operations
function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const parsed = cadastroEmpresaSchema.safeParse(body)
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      )
    }

    const { nome_empresa, cnpj, nome_admin, email, password, cargo } = parsed.data
    const supabase = createServiceClient()

    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) {
      if (authError.message.includes('already been registered') || authError.message.includes('already exists')) {
        return NextResponse.json(
          { error: 'Este e-mail já está cadastrado. Tente fazer login.' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: 'Erro ao criar conta. Tente novamente.' },
        { status: 500 }
      )
    }

    const userId = authData.user.id

    // 2. Generate unique invite code
    let codigoConvite = generateInviteCode()
    // Check uniqueness (unlikely collision, but be safe)
    const { data: existing } = await supabase
      .from('organizations')
      .select('id')
      .eq('codigo_convite', codigoConvite)
      .maybeSingle()
    if (existing) {
      codigoConvite = generateInviteCode() // Try once more
    }

    // 3. Insert organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({
        nome: nome_empresa,
        cnpj: cnpj || null,
        codigo_convite: codigoConvite,
        plano: 'starter',
        ciclo_checkin: 'semanal',
      })
      .select()
      .single()

    if (orgError) {
      // Cleanup: delete the auth user we just created
      await supabase.auth.admin.deleteUser(userId)
      return NextResponse.json(
        { error: 'Erro ao criar organização. Tente novamente.' },
        { status: 500 }
      )
    }

    // 4. Insert admin profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        org_id: org.id,
        role: 'admin_rh',
        nome: nome_admin,
        email,
        cargo: cargo || null,
        codigo_anonimo: generateAnonymousCode(),
      })

    if (profileError) {
      // Cleanup
      await supabase.from('organizations').delete().eq('id', org.id)
      await supabase.auth.admin.deleteUser(userId)
      return NextResponse.json(
        { error: 'Erro ao criar perfil. Tente novamente.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      codigo_convite: codigoConvite,
      org_id: org.id,
    })
  } catch (err) {
    console.error('Cadastro empresa error:', err)
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente.' },
      { status: 500 }
    )
  }
}
