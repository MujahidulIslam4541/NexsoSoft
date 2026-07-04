import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { comparePasswords, signJWT } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    // 1. Fetch Admin User
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 2. Verify Password
    const passwordMatch = await comparePasswords(password, user.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 3. Generate Session Token
    const sessionToken = await signJWT({ id: user.id, username: user.username });

    // 4. Send Response with HTTP-only Cookie
    const response = NextResponse.json({ success: true, message: 'Logged in successfully' });
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7200, // 2 hours
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Error during login api:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
