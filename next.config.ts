import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', 
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
