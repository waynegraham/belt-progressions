import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/belt-progressions",
  assetPrefix: "/belt-progressions/",
};

export default nextConfig;
