'use server';

import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';
import { Post } from '@/app/lib/definitions';
import PostPage from '@/components/PostPage';

type PostPageSlugProps = {
  params: Promise<{ year: number; month: number; slug: string }>;
};

export default async function PostPageSlug({ params }: PostPageSlugProps) {
  const { year, month, slug } = await params;
  console.log(year, month, slug);

  const query = await sql`
    SELECT *
    FROM posts
    WHERE EXTRACT(YEAR FROM publish_date) = ${year}
      AND EXTRACT(MONTH FROM publish_date) = ${month}
      AND deleted_at IS NULL
      AND slug = ${slug}
    ORDER BY publish_date DESC
    LIMIT 1
  `;
  const post: Post = query.rows[0] as Post;

  if (!post) {
    notFound();
  }

  return PostPage(post);
}
