/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/categories',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
