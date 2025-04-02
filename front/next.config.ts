import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,

  trailingSlash: true, // Asegura que los archivos estáticos se carguen correctamente

  assetPrefix: "/", // 👈 importante para Electron
};

module.exports = nextConfig;
