import { NextResponse, type NextRequest } from 'next/server'

/**
 * Route protection middleware.
 *
 * Firebase Auth tokens live in an HttpOnly cookie named `__session` when using
 * Firebase Hosting, or you can set it manually after login via a server action.
 * For now this middleware protects routes by checking for a session cookie;
 * the AuthContext on the client handles the full role-based redirect.
 *
 * Protected prefixes → must be authenticated
 * Role-locked prefixes → checked server-side once session cookie is verified
 */

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/messaging',
  '/calendar',
]

const PUBLIC_PATHS = ['/', '/about', '/workshops', '/curriculum', '/contact']
const AUTH_PATHS   = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get('__session')?.value

  const isProtected = PROTECTED_PREFIXES.some(p => pathname.startsWith(p))
  const isAuthPage  = AUTH_PATHS.some(p => pathname.startsWith(p))

  // Redirect unauthenticated users away from protected routes
  if (isProtected && !sessionCookie) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from login/register
  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard/parent', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Run on all paths except static files and Next internals
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
