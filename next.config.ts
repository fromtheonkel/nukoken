import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 't5nrfs8r8q1fa7jw.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
