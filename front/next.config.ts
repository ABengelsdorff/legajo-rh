import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  assetPrefix: isProd ? "/" : "", // Usamos "./" solo en producción
  trailingSlash: true, // Asegura que los archivos estáticos se carguen correctamente
};

module.exports = nextConfig;
