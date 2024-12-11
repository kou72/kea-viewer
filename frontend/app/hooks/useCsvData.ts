import { useState, useEffect, useCallback } from "react";

interface CsvData {
  address: string;
  hwaddr: string;
  hostname: string;
}

export const useCsvData = (autoRefresh: boolean = false) => {
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const envRefreshInterval = process.env.NEXT_PUBLIC_REFRESH_INTERVAL;
  const refreshInterval = envRefreshInterval !== undefined ? Number(envRefreshInterval) : 1;
  const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "3001";
  const backendIpAddress = process.env.NEXT_PUBLIC_BACKEND_IP_ADDRESS || "127.0.0.1";
  const csvPath = process.env.NEXT_PUBLIC_CSV_PATH || "Loading...";

  const fetchCsvData = useCallback(async () => {
    try {
      const response = await fetch(`http://${backendIpAddress}:${backendPort}/api/leases/v4`);
      const data = await response.json();
      setCsvData(data);
      setError(null);
    } catch (err) {
      setError(String(err));
    }
  }, [backendIpAddress, backendPort]);

  const refresh = async () => {
    await fetchCsvData();
  };

  // 初回のデータ取得
  useEffect(() => {
    fetchCsvData();
  }, [fetchCsvData]);

  // autoRefresh が true の場合、指定された間隔でデータを取得
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchCsvData, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchCsvData, refreshInterval]);

  return {
    csvData,
    error,
    refresh,
    refreshInterval,
    csvPath,
  };
};
