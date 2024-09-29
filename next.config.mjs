/** @type {import('next').NextConfig} */
const nextConfig = {
  env : {
    "api_url" : "http://localhost:4000/",
    "basket_url" : "http://localhost:9000/digita-signature-project/"
  },
  typescript : {
    ignoreBuildErrors : true,
  },
  eslint : {
    ignoreBuildErrors : true,
  }
};

export default nextConfig;
