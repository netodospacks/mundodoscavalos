import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.103",
    "192.168.1.100",
    "192.168.1.101",
    "192.168.1.102",
    "192.168.1.104",
    "192.168.1.105",
    "localhost",
    "0.0.0.0",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 768, 1024, 1280, 1440, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  compress: true,
};

export default nextConfig;

