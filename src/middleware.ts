import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'stackmajix_super_secret_key_change_me_in_production';
const key = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin Dashboard UI and sensitive Admin APIs
  const isDashboardRoute = pathname.startsWith('/admin/dashboard');
  const isSensitiveApiRoute = pathname.startsWith('/api/admin') && !pathname.endsWith('/login');

  if (isDashboardRoute || isSensitiveApiRoute) {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      if (isSensitiveApiRoute) {
        return NextResponse.json({ error: 'Unauthorized. No session found.' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify JWT
      await jwtVerify(sessionToken, key, { algorithms: ['HS256'] });
      return NextResponse.next();
    } catch (err) {
      // Invalid token
      if (isSensitiveApiRoute) {
        return NextResponse.json({ error: 'Unauthorized. Invalid session token.' }, { status: 401 });
      }
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/api/admin/:path*'],
};
