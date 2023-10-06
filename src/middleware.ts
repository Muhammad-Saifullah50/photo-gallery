import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {

    let pathname = request.nextUrl.pathname
    
    let token = request.cookies.get('next-auth.session-token' || '__Secure-next-auth.session-token')

    const publicPath = pathname === '/' || pathname === '/gallery' || pathname === '/signin'

    if (!publicPath && !token) {
        const response = NextResponse.redirect(new URL('/signin', request.nextUrl))
        return response

    }
    if (token && pathname === '/signin') {
        const response = NextResponse.redirect(new URL('/gallery', request.nextUrl))
        return response
    }
    if (token) {
        const response = NextResponse.next()
        return response
    }




}



export const config =
{
    matcher: [
        '/albums/:path*',
        '/favorites/:path*',
        '/profile/:path*',
        '/uploads/:path*',
        '/signin',
        '/gallery'

    ]
}