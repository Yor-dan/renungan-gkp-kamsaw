import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib/session';

export default async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;

  // 1. Special handling for login page
  if (currentPath === '/admin/login') {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie as string);

    if (session?.userName) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }

    return NextResponse.next();
  }

  // 2. Check for protected routes
  const protectedRoutes = ['/admin', '/admin/preview'];
  const isProtectedRoute = protectedRoutes.some(
    (route) => currentPath === route || currentPath.startsWith(`${route}/`)
  );

  if (isProtectedRoute) {
    // 3. Check for valid session
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie as string);

    // 4. Redirect unauthed users
    if (!session?.userName) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
    }

    // 5. Render route for authed users
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/admin/:path*', '/preview/:path*'],
};
