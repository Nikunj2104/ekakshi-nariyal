/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Matches any route under /api
        destination: "http://localhost:5000/api/:path*", // Forwards the request to the backend
      },
    ];
  },
};

export default nextConfig;
