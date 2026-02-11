import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: false,
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  compress: true,
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
