import type { NextConfig } from "next";
import { readFileSync } from "fs";
import { join } from "path";

// 設定ファイルを読み込む
const config = JSON.parse(readFileSync(join("..", "kea-viewer.conf"), "utf8"));

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_PORT: String(config.backendPort),
  },
};

export default nextConfig;
