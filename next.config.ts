import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables strict mode for highlighting potential issues.
  images: {
    domains: ["books.google.com"], // Allow images from books.google.com.
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Prevents server-only modules like `fs` from breaking the client.
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;


