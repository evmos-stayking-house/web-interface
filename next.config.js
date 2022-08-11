/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import "colors.scss"; @import "darkmode.scss"; @import "media.scss";`
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.watchOptions = {
      poll: 10000,
      aggregateTimeout: 300
    }
    return config;
  }
};

module.exports = nextConfig;
