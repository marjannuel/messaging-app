import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      // Set this to 4MB or 10MB depending on your needs
      bodySizeLimit: '50mb', 
    },
  },
};

export default nextConfig;
