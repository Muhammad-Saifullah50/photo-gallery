import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
    let pathname = request.nextUrl.pathname
    console.log(pathname, 'pathname')
    let token = request.cookies.get('next-auth.session-token')

    const publicPath = pathname === '/' || pathname === '/gallery' || pathname === '/signin'

    const hasBeenRedirected = request.cookies.get('hasBeenRedirected');

    if (!publicPath && !token) {
        const response = NextResponse.redirect(new URL('/signin', request.nextUrl))
        return response

    }

    if (token && !hasBeenRedirected) {
        const response = NextResponse.redirect((new URL('/gallery', request.nextUrl)))
        response.cookies.set('hasBeenRedirected', 'true');
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