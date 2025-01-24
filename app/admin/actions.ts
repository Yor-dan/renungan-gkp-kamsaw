'use server';

import { sql } from '@vercel/postgres';
import { createSession } from '@/app/lib/session';
import { deleteSession } from '@/app/lib/session';
import { revalidatePath } from 'next/cache';
import { NewPost } from '@/app/lib/definitions';
// import { nanoid } from 'nanoid';

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
  title,
  publish_date,
  verse,
  book,
  body,
}: NewPost) {
  try {
    console.log('New Post Data:');
    console.log('Title:', title);
    console.log('Publish Date:', publish_date);
    console.log('Body:', body);
    console.log('Verse:', verse);
    console.log('Book:', book);

    // await sql`
    //   INSERT INTO posts (title, date, verse, ref, body, banner)
    //   VALUES (${nanoid()}, ${title}, ${date}, ${verse}, ${ref}, ${body}, ${banner})
    // `;

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to create post:', error);
    return { success: false, error: 'Failed to create post' };
  }
}
