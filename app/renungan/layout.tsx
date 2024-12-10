export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-4 text-center text-muted-foreground">
          © 2024 Renungan Harian GKP Kampung Sawah.
        </div>
      </footer>
    </div>
  );
}
