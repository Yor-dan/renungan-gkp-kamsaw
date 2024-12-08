import Link from 'next/link';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-foreground">
            GKP Kampung Sawah
          </Link>
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Kembali ke beranda
          </Link>
        </nav>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-4 text-center text-muted-foreground">
          © 2024 Renungan Harian GKP Kampung Sawah.
        </div>
      </footer>
    </div>
  );
}
