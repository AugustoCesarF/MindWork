import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cadastroFuncionarioSchema } from '@/lib/validators/auth'
import { generateAnonymousCode } from '@/lib/utils'

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
    const parsed = cadastroFuncionarioSchema.safeParse(body)
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      )
    }

    const { codigo_convite, email, password, departamento } = parsed.data
    const supabase = createServiceClient()

    // 1. Look up organization by invite code
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .select('id, nome')
      .eq('codigo_convite', codigo_convite.toUpperCase())
      .maybeSingle()

    if (orgError || !org) {
      return NextResponse.json(
        { error: 'Código de convite inválido. Verifique com o RH da sua empresa.' },
        { status: 404 }
      )
    }

    // 2. Create auth user
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

    // 3. Generate unique anonymous code
    let codigoAnonimo = generateAnonymousCode()
    const { data: existingCode } = await supabase
      .from('profiles')
      .select('id')
      .eq('codigo_anonimo', codigoAnonimo)
      .maybeSingle()
    if (existingCode) {
      codigoAnonimo = generateAnonymousCode() // Try once more
    }

    // 4. Insert employee profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        org_id: org.id,
        role: 'funcionario',
        nome: 'Anônimo',
        email,
        departamento: departamento || null,
        codigo_anonimo: codigoAnonimo,
      })

    if (profileError) {
      // Cleanup: delete the auth user
      await supabase.auth.admin.deleteUser(userId)
      return NextResponse.json(
        { error: 'Erro ao criar perfil. Tente novamente.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      org_nome: org.nome,
    })
  } catch (err) {
    console.error('Cadastro funcionário error:', err)
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente.' },
      { status: 500 }
    )
  }
}
