import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const customCookie = process.env.ACCESS_TOKEN_COOKIE;

export function middleware(req: NextRequest) {
  const token = req.cookies.get(customCookie);

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/playlist', '/library'],
};
