'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { NewPost } from '@/app/lib/definitions';
import { createSession, deleteSession } from '@/app/lib/session';
import { addLineBreaks, uploadImage } from '@/app/lib/utils';
import { nanoid } from 'nanoid';

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
    await sql`UPDATE posts SET deleted_at = now() WHERE id = ${id}`;
    revalidatePath('/admin');
    return { success: true, message: 'Post deleted successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to delete the post' };
  }
}

export async function publishPost(id: number) {
  try {
    await sql`UPDATE posts SET deleted_at = NULL WHERE id = ${id}`;
    revalidatePath('/admin');
    return { success: true, message: 'Post published successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to publish the post' };
  }
}

export async function createPost({
  image,
  title,
  publish_date,
  verse,
  book,
  body,
}: NewPost) {
  try {
    const imageUrl = await uploadImage(image);
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    await sql`
      INSERT INTO posts (id, image_url, title, publish_date, verse, book, body, slug)
      VALUES (${nanoid()}, ${imageUrl}, ${title}, ${publish_date}, ${verse}, ${book}, ${addLineBreaks(
      body
    )}, ${slug})
    `;

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to create post:', error);
    return { success: false, error: 'Failed to create post' };
  }
}
