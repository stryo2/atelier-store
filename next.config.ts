import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sample catalogue imagery built by src/lib/unsplash.ts. The query string
    // varies (focal-point crops), so `search` is left open for this host only.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo-*",
      },
    ],
  },
};

export default nextConfig;
