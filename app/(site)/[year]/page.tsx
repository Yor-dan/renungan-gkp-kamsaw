'use server';

import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';
import PostPage, { PostPageProps } from '@/components/PostPage';

type PostPageYearProps = {
  params: Promise<{ year: number }>;
};

export default async function PostPageYear({ params }: PostPageYearProps) {
  const { year } = await params;

  const query = await sql`
    SELECT *
    FROM posts
    WHERE EXTRACT(YEAR FROM publish_date) = ${year}
      AND deleted_at IS NULL
    ORDER BY publish_date DESC
    LIMIT 1
  `;
  const post = query.rows[0] as PostPageProps;

  if (!post) {
    notFound();
  }

  return PostPage(post);
}
