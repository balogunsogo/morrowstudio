import type { NextConfig } from "next";
import {dataset, projectId} from './src/sanity/env';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      port: '',
      pathname: `/images/${projectId}/${dataset}/**`,
    }],
  },
};

export default nextConfig;
