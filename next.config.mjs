/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: { allowedOrigins: ['*'] }
  },
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] }
};
export default nextConfig;
