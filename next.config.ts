import type { NextConfig } from "next";

if (process.env.APP_ENV === 'development') { process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; }

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