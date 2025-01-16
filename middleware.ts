import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib/session';

export default async function middleware(req: NextRequest) {
  // 1. check for protected routes
  const protectedRoutes = ['/admin'];
  const currentPath = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    // 2. check for valid session
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie as string);

    // 3. redirect unauthed users
    if (!session?.userName) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
    }

    // 4. render route
    return NextResponse.next();
  }

  // check user session on login page
  if (currentPath === '/admin/login') {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie as string);

    if (session?.userName) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }

    return NextResponse.next();
  }
}
