import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wdo3jaxn87attzgi.public.blob.vercel-storage.com',
        pathname: '/renungan-card-images/*',
        port: '',
      },
    ],
  },
};

export default nextConfig;
