import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // remotePatterns: [new URL("https://sandpack-bundler.vercel.app/**")],
    remotePatterns: [new URL('https://covers.openlibrary.org/b/isbn/**')],
  },
};

export default nextConfig;
