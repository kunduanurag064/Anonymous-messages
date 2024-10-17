// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token');
    const url = req.nextUrl.clone();

    if (token) {
        if (url.pathname === '/login' || url.pathname === '/signup') {
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
    }
    if(!token && ( url.pathname === '/' || url.pathname==='/profile')){
        url.pathname = '/login';
            return NextResponse.redirect(url);
    }

    return NextResponse.next(); // Proceed to the requested page
}

export const config = {
    matcher: ['/login', '/signup', '/','/profile']
};
