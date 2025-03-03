import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken');

  const loginPath = '/pages/login';
  const homePath = '/pages/home';
  const pagesPath = ['/pages/about', '/pages/sell'];

  if (token && request.nextUrl.pathname === loginPath) {
    return NextResponse.redirect(new URL(homePath, request.url));
  }

  if (!token && pagesPath.some(route => request.nextUrl.pathname.startsWith(route))){
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/pages/login'],
};
