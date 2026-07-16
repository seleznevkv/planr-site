import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // standalone: самодостаточный node-сервер в .next/standalone для запуска в Docker
  // (App Router/RSC требуют рантайм, а не статику). См. Dockerfile.
  output: "standalone",
};

export default nextConfig;
