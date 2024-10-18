// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token');
    const url = req.nextUrl.clone();

    // Simple regex-based user-agent detection, if needed
    const userAgent = req.headers.get('user-agent') || '';
    const isMobile = /mobile/i.test(userAgent);
    const isBot = /bot|crawler|spider|crawling/i.test(userAgent);

    // Block bots from accessing certain pages (optional)
    if (isBot) {
        return NextResponse.redirect('/no-bots-allowed');
    }

    if (token) {
        if (url.pathname === '/login' || url.pathname === '/signup') {
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
    }

    if (!token && (url.pathname === '/' || url.pathname === '/profile')) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next(); // Proceed to the requested page
}

export const config = {
    matcher: ['/login', '/signup', '/', '/profile'],
};
