import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/api/auth/login',
      },
    ];
  },
};

export default nextConfig;
