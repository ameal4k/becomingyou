import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.emilhewitt.webp", pathname: "/**" },
      { protocol: "http",  hostname: "www.emilhewitt.webp", pathname: "/**" },
    ],
  },
};

export default nextConfig;
