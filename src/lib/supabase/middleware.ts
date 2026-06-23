import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/cadastro-empresa', '/cadastro-funcionario']
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname === route)
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/')
  const isStaticAsset = request.nextUrl.pathname.startsWith('/_next/')

  if (isStaticAsset || isApiRoute) {
    return supabaseResponse
  }

  // If not authenticated and trying to access protected route, redirect to login
  if (!user && !isPublicRoute) {
    // DEMO MODE: Desabilitado redirecionamento para login para permitir visualização
    // const url = request.nextUrl.clone()
    // url.pathname = '/login'
    // return NextResponse.redirect(url)
    return supabaseResponse
  }

  // If authenticated, fetch profile to determine role-based redirect
  if (user && isPublicRoute && request.nextUrl.pathname !== '/') {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile) {
      const url = request.nextUrl.clone()
      switch (profile.role) {
        case 'super_admin':
          url.pathname = '/admin'
          break
        case 'admin_rh':
          url.pathname = '/dashboard'
          break
        case 'funcionario':
          url.pathname = '/checkin'
          break
        case 'psicologo':
          url.pathname = '/encaminhamentos'
          break
      }
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
