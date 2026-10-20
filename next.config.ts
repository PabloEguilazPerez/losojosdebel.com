import type { NextConfig } from "next";

const wordpressUrl = (process.env.WORDPRESS_URL ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Featured images from the WordPress media library.
    remotePatterns: wordpressUrl ? [new URL(`${wordpressUrl}/wp-content/uploads/**`)] : [],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
