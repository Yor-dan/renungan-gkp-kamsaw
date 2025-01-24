'use server';

import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';
import { Post } from '@/app/lib/definitions';
import PostPage from '@/components/PostPage';

type PostPageYearProps = {
  params: Promise<{ month: number }>;
};

export default async function PostPageYear({ params }: PostPageYearProps) {
  const { month } = await params;

  const query = await sql`
    SELECT *
    FROM posts
    WHERE EXTRACT(MONTH FROM publish_date) = ${month}
      AND deleted_at IS NULL
    ORDER BY publish_date DESC
    LIMIT 1
  `;
  const post: Post = query.rows[0] as Post;

  if (!post) {
    notFound();
  }

  return PostPage(post);
}
