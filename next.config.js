/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/ken-wu-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ken-wu-portfolio/' : '',
  trailingSlash: true,
}

module.exports = nextConfig 