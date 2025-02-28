/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Matches any route under /api
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, // Forwards the request to the backend
      },
    ];
  },
  productionBrowserSourceMaps: false, // Disable source maps in production
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Obfuscate and optimize client-side code
      config.optimization.minimizer[0].options.terserOptions = {
        compress: {
          drop_console: true, // Remove console logs in production
        },
        mangle: true, // Obfuscate variable and function names
      };
    }
    return config;
  },
};

export default nextConfig;
