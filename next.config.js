/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // apparently easy-peasy doesn't perform well on strict-mode
  swcMinify: true,
};

module.exports = nextConfig;
