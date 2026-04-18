import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function proxy(request) {
  const DISABLE_SECURITY = true; 

  if (DISABLE_SECURITY) return NextResponse.next();
  
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          request.cookies.set({ name, value, ...options }) 
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          request.cookies.set({ name, value:'', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
      },
    }
  )

  // This refreshes the session if it's expired
  const { data: { user } } = await supabase.auth.getUser()

  let hasProfile = false;
    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single()
  
    if (profile) hasProfile = true;
    }

    // --- REDIRECT LOGIC ---

    // If logged in and has a profile, don't let them see /login OR /setup
    if (user && hasProfile && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/setup'))) {
    return NextResponse.redirect(new URL('/', request.url)) // Send to Homepage
    }

    // If logged in but NO profile, and trying to go to home/marketplace
    if (user && !hasProfile && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/setup', request.url)) // Force them to finish setup
    }

    // If NOT logged in and trying to see setup or home
    if (!user && (request.nextUrl.pathname.startsWith('/setup') || request.nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/login', request.url))
    }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}