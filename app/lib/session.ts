import 'server-only';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const key = new TextEncoder().encode(process.env.SECRET);

const cookie = {
  name: 'session',
  options: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
  },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key);
}

export async function decrypt(session: string) {
  try {
    const payload = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload.payload as JWTPayload & { userName: string };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createSession(userName: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userName, expires });

  (await cookies()).set(cookie.name, session, { ...cookie.options, expires });
  redirect('/admin');
}

export async function verifySession() {
  const reqCookie = (await cookies()).get(cookie.name)?.value;
  const session = await decrypt(reqCookie as string);
  if (!session?.userName) {
    redirect('/admin/login');
  }

  return { userName: session.userName };
}

export async function deleteSession() {
  (await cookies()).delete(cookie.name);
  redirect('/admin/login');
}
