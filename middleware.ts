import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Assume token is stored in 'token' cookie for server-side checks
    // (Client side uses localStorage usually, but for middleware we need cookie)
    // We need to ensure login flow sets cookie OR we rely on a client-side layout check as fallback.
    // Given the current authService implementation might primarily use localStorage, 
    // we might need to update authService to ALSO set a cookie, or this middleware will block everyone.

    // Let's check for "token" cookie.
    const token = request.cookies.get('token')?.value

    // Protected paths
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!token) {
            // If no token, redirect to login
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }
    }

    // Redirect root to dashboard if logged in (optional but nice)
    if (request.nextUrl.pathname === '/') {
        // optional: check token and redirect
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
}
