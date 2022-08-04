/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  reactStrictMode: true,
  images: {
      domains: [ 'localhost','festival-party-api.s3.sa-east-1.amazonaws.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL_IMAGES: process.env.NEXT_PUBLIC_API_URL_IMAGES,
    API_URL: process.env.API_URL,
  }
}
