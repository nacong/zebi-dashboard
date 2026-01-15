import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://zebi-dashboard-bucket.s3.eu-north-1.amazonaws.com/**')],
  },
};

export default nextConfig;

