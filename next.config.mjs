import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'v0.blob.com',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [],
    optimizePackageImports: ['lucide-react'],
  },
  webpack: (config, { isServer }) => {
    // Only run this on the client-side build
    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash].css',
          chunkFilename: 'static/css/[id].[contenthash].css',
        })
      );
    }
    return config;
  },
}

export default nextConfig

