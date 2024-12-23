import type { NextConfig } from "next";

import { documentMaxSize } from "@/document/config";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: documentMaxSize,
    },
  },
};

export default nextConfig;
