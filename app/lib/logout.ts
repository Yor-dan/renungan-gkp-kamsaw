'use server';

import { deleteSession } from '@/app/lib/session';

export default async function logout() {
  await deleteSession();
}
