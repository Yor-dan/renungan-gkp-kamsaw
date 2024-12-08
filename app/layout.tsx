import type { Metadata } from 'next';
import './globals.css';
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
  title: 'Renungan GKP Kampung Sawah',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
