/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["robohash.org"],
  },

  async rewrites() {
    return [
      {
        // Перенаправляем только API-запросы (чаще всего именно их нужно проксировать на бэк)
        source: "/api/:path*",
        destination: "http://localhost:4000/:path*",
      },
    ];
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        bufferutil: false,
        "utf-8-validate": false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
