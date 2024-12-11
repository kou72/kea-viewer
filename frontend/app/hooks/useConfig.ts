// configファイルから環境変数を取得
export const useConfig = () => {
  const csvPath = process.env.NEXT_PUBLIC_CSV_PATH || "Loading...";
  const envRefreshInterval = process.env.NEXT_PUBLIC_REFRESH_INTERVAL;
  const refreshInterval = envRefreshInterval !== undefined ? Number(envRefreshInterval) : 5;
  const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "3001";
  const frontendPort = process.env.NEXT_PUBLIC_FRONTEND_PORT || "3000";
  const backendIp = process.env.NEXT_PUBLIC_BACKEND_IP || "127.0.0.1";

  return {
    csvPath,
    refreshInterval,
    backendPort,
    frontendPort,
    backendIp,
  };
};
