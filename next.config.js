/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
      domains: [ 'localhost','festival-party-api.s3.sa-east-1.amazonaws.com'],
  },
}
