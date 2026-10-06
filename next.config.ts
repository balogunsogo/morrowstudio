import type { NextConfig } from "next";
import {dataset, projectId} from './src/sanity/env';

const nextConfig: NextConfig = {
  experimental: {
    // Deliver the current route's styles with its HTML instead of a CSS waterfall.
    inlineCss: true,
  },
  images: {
    // Include smaller responsive candidates instead of jumping straight to 640px.
    deviceSizes: [320, 384, 480, 640, 750, 828, 960, 1080, 1200, 1440, 1920, 2048, 3840],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      port: '',
      pathname: `/images/${projectId}/${dataset}/**`,
    }],
  },
};

export default nextConfig;
