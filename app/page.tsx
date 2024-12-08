'use server';

import { sql } from '@vercel/postgres';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateToIndo } from './lib/utils';

export default async function Home() {
  const query = await sql`SELECT * FROM renungan ORDER BY id`;
  const arrayRenungan = query.rows;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="/landing-page-banner.jpg"
          alt="landing page banner image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />{' '}
        {/* Overlay for better text visibility */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
            RENUNGAN HARIAN
          </h1>
          <p className="mt-4 text-xl text-white/90 max-w-3xl mx-auto px-4">
            Renungan Harian Gereja Kristen Pasundan - Jemaat Kampung Sawah
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto py-12 px-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Renungan Terbaru
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {arrayRenungan.map((renungan) => (
            <Card href={`renungan/${renungan.id}`} key={renungan.id}>
              <div className="relative h-64 w-full">
                <Image
                  src={renungan.image}
                  alt={'renungan card thumbnail image'}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="flex-grow flex flex-col p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {formatDateToIndo(renungan.date)}
                </p>
                <CardHeader className="p-0">
                  <CardTitle className="text-lg font-semibold mb-2">
                    {renungan.title}
                  </CardTitle>
                </CardHeader>
                <p className="text-muted-foreground text-sm">
                  {renungan.body.slice(0, 128) + '...'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
