'use server';

import { sql } from '@vercel/postgres';
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

export async function deletePost(id: number) {
  try {
    await sql`UPDATE renungan SET deleted_at = now() WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to delete the post' };
  }
}
