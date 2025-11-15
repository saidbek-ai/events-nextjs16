import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "unsplash.com",
    //     pathname: "/**",
    //   },
    // ],

    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
