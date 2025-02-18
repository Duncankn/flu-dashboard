import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/flu-dashboard',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
