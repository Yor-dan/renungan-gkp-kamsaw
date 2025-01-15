import { sql } from '@vercel/postgres';
import KartuRenungan from '@/components/KartuRenungan';
import LoadMoreButton from '@/components/LoadMoreButton';
import { convertToNum } from './lib/utils';

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const limit = convertToNum(params.limit, 6);

  const query = await sql`SELECT * FROM renungan
    WHERE deleted_at IS NULL
    ORDER BY date DESC LIMIT ${limit + 1}`;
  const queryResult = query.rows;
  const content =
    queryResult.length === 0 ? (
      <h3 className="text-xl md:text-2xl font-bold text-center mt-8">
        Tidak ada renungan saat ini.
      </h3>
    ) : (
      <>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Renungan Terbaru
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {queryResult.slice(0, limit).map((renungan) => (
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
      </>
    );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f4d_2px,transparent_2px),linear-gradient(to_bottom,#4f4f4f4d_2px,transparent_2px)] bg-[size:28px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="relative z-10 text-center">
          <h1 className="font-bold tracking-wide leading-[4rem] text-5xl md:text-6xl lg:text-7xl">
            RENUNGAN HARIAN
          </h1>
          <p className="mt-4 text-lg md:hidden">
            Gereja Kristen Pasundan
            <br />
            Jemaat Kampung Sawah
          </p>
          <p className="hidden md:block mt-4 text-xl max-w-3xl mx-auto px-4">
            Gereja Kristen Pasundan - Jemaat Kampung Sawah
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto py-12 px-8">
        {content}
        {queryResult.length > limit && <LoadMoreButton limit={limit} />}
      </section>
    </div>
  );
}
