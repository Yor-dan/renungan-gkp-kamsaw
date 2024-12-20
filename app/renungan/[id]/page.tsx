'use server';

import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatDateToIndo } from '@/app/lib/utils';
import { Quote } from '@/components/quote';

type RenunganPageProps = {
  params: Promise<{ id: string }>;
};

export default async function Renungan({ params }: RenunganPageProps) {
  const { id } = await params;

  const query = await sql`SELECT * FROM renungan WHERE id = ${id}`;
  const renungan = query.rows[0];

  if (!renungan) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-screen-xl">
        <div className="relative w-full aspect-video md:h-[40vh] md:min-h-[300px]">
          <Image
            src={renungan.image}
            alt={`Banner image for ${renungan.title}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="w-full max-w-prose px-4 py-8">
        {/* blog title */}
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          {renungan.title}
        </h1>

        {/* blog date */}
        <time className="md:text-base text-muted-foreground mb-8 block">
          {formatDateToIndo(renungan.date)}
        </time>

        {renungan.verse && (
          <Quote quote={renungan.verse} quote_ref={renungan.ref} />
        )}

        {/* blog body */}
        <div className="prose prose-stone dark:prose-invert">
          {renungan.body.split('  ').map((paragraph: string, index: number) => (
            <p key={index} className="mb-4 text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
