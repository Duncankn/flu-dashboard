import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'https://www.flu-dashboard.vercel.app' }],
        destination: 'https://flu-dashboard.vercel.app/:path*',
        permanent: true, // Or 308
      },
    ]
  },
};

export default nextConfig;
