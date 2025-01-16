'use server';

import { createSession } from '@/app/lib/session';
import { deleteSession } from '@/app/lib/session';

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    await createSession(username as string);
  }
}

export async function logout() {
  await deleteSession();
}
