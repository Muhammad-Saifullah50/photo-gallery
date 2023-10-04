import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
    let pathname = request.nextUrl.pathname
    console.log(pathname, 'pathname')
    let token = request.cookies.get('next-auth.session-token')

    const publicPath = pathname === '/' || pathname === '/gallery' || pathname === '/signin'

    if (!publicPath && !token) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl))
    }
    if (token ) {
        return NextResponse.redirect(new URL('/gallery', request.nextUrl))
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

    ]
}