import TerserPlugin from "terser-webpack-plugin";

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
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Ensure the minimizer array exists
      config.optimization.minimizer = config.optimization.minimizer || [];

      // Find the Terser plugin (if it exists)
      const terserPlugin = config.optimization.minimizer.find(
        (plugin) => plugin.constructor.name === "TerserPlugin"
      );

      if (terserPlugin) {
        // Modify the Terser plugin options
        terserPlugin.options.terserOptions = {
          compress: {
            drop_console: true, // Remove console logs in production
          },
          mangle: true, // Obfuscate variable and function names
        };
      } else {
        // If Terser plugin doesn't exist, add it manually
        config.optimization.minimizer.push(
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
              },
              mangle: true,
            },
          })
        );
      }
    }
    return config;
  },
};

export default nextConfig;
