const withTM = require("next-transpile-modules")([
  "ui",
  "analytics",
  "utils",
  "api-client",
  "constant",
]);

module.exports = withTM({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "gateway.pinata.cloud",
      "cdn2.kadefi.money",
      "ipfs.io",
      "firebasestorage.googleapis.com",
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});
