import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://localhost:7113/api/:path*',
      },
    ]
  },
};

export default nextConfig;
