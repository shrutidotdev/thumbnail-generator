import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "onnxruntime-node",
    "@imgly/background-removal-node",
  ],

  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "lkfnrbusvx1x8q8s.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  // Enable compression
  compress: true,
  // Disable Turbopack for production builds to avoid Clerk compatibility issues
  // Turbopack can still be used for dev with: pnpm dev --turbopack
  webpack: (config, { isServer }) => {
    // Ensure Clerk works properly with webpack
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
