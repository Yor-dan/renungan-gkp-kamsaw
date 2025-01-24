'use server';

import Image from 'next/image';
import { Post } from '@/app/lib/definitions';
import { Quote } from '@/components/quote';
import { formatDateToIndo } from '@/app/lib/utils';

export type PostPageProps = Omit<Post, 'id' | 'deleted_at'>;

export default async function PostPage({
  image_url,
  title,
  publish_date,
  body,
  verse,
  book,
}: PostPageProps) {
  return (
    <article className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-screen-xl">
        <div className="relative w-full aspect-video md:h-[40vh] md:min-h-[300px]">
          <Image
            src={image_url}
            alt={`Banner image for ${title}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="w-full max-w-prose px-4 py-8">
        {/* post title */}
        <h1 className="text-4xl font-bold mb-4 text-foreground">{title}</h1>

        {/* post publish date */}
        <time className="md:text-base text-muted-foreground mb-8 block">
          {formatDateToIndo(publish_date)}
        </time>

        {/* post verse */}
        {verse && book && <Quote quote={verse} quote_ref={book} />}

        {/* post body */}
        <div className="prose prose-stone dark:prose-invert">
          {body.split('  ').map((paragraph: string, index: number) => (
            <p key={index} className="mb-4 text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
