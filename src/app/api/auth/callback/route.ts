import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { RoleType } from '@/types/database'

const ROLE_REDIRECTS: Record<RoleType, string> = {
  admin_rh: '/dashboard',
  funcionario: '/checkin',
  psicologo: '/encaminhamentos',
  super_admin: '/admin',
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || ''

  if (code) {
    const supabase = await createClient()

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Determine redirect based on role
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (profile?.role) {
          const redirectTo = next || ROLE_REDIRECTS[profile.role as RoleType] || '/dashboard'
          return NextResponse.redirect(`${origin}${redirectTo}`)
        }
      }

      // Fallback: redirect to next param or dashboard
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next || '/dashboard'}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next || '/dashboard'}`)
      } else {
        return NextResponse.redirect(`${origin}${next || '/dashboard'}`)
      }
    }
  }

  // Auth code error — redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
}
