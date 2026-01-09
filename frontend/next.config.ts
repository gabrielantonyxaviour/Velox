import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
      },
      {
        protocol: 'https',
        hostname: '*.ipfs.dweb.link',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Handle pino and thread-stream issues
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    // Ignore node-specific modules in client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        worker_threads: false,
      };
    }

    return config;
  },
  transpilePackages: ['@privy-io/react-auth', '@walletconnect/sign-client', '@walletconnect/utils'],
  // Disable turbopack for build
  experimental: {
    webpackBuildWorker: true,
  },
};

export default nextConfig;
