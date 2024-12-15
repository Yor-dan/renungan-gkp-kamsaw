'use server';

import { sql } from '@vercel/postgres';
import Image from 'next/image';
import KartuRenungan from '@/components/KartuRenungan';

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
            <KartuRenungan
              key={renungan.id}
              id={renungan.id}
              image={renungan.image}
              date={renungan.date}
              title={renungan.title}
              body={renungan.body}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
