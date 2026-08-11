import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    qualities: [25, 50, 75, 90, 100],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
