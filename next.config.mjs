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
};

export default nextConfig;
