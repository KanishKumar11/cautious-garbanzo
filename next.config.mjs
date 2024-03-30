/** @type {import('next').NextConfig} */
const API_URL = process.env.API_URL;
const SOCKET_URL = process.env.SOCKET_URL;

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `http://127.0.0.1:8000/:path*`,
      },
      // {
      //   source: "/socket/:path*",
      //   destination: `${SOCKET_URL}/:path*`,
      // },
    ];
  },
};

export default nextConfig;
