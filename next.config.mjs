/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next_dev_2',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};
export default nextConfig;
