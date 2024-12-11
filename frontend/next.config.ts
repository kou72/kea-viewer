import type { NextConfig } from "next";
import { readFileSync } from "fs";
import { join } from "path";

// 設定ファイルを読み込む
const config = JSON.parse(readFileSync(join("..", "kea-viewer.conf"), "utf8"));

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_CSV_PATH: config.csvPath,
    NEXT_PUBLIC_REFRESH_INTERVAL: String(config.refreshInterval),
    NEXT_PUBLIC_BACKEND_PORT: String(config.backendPort),
    NEXT_PUBLIC_FRONTEND_PORT: String(config.frontendPort),
    NEXT_PUBLIC_BACKEND_IP_ADDRESS: config.backendIpAddress,
  },
};

export default nextConfig;
