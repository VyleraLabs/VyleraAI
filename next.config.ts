import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
