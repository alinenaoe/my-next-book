import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // remotePatterns: [new URL("https://sandpack-bundler.vercel.app/**")],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'books.google.com',
        pathname: '/books/content',
      },
    ],
  },
};

export default nextConfig;
