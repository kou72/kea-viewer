import { useState, useEffect, useCallback } from "react";
import { useConfig } from "@/app/hooks/useConfig";

interface CsvData {
  address: string;
  hwaddr: string;
  hostname: string;
}

export const useCsvData = (autoRefresh: boolean = false) => {
  const { refreshInterval, backendIp, backendPort } = useConfig();
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // CSVデータ取得
  const fetchCsvData = useCallback(async () => {
    try {
      const response = await fetch(`http://${backendIp}:${backendPort}/api/leases/v4`);
      const data = await response.json();
      setCsvData(data);
      setError(null);
    } catch (err) {
      setError(String(err));
    }
  }, [backendIp, backendPort]);

  // データを再取得
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
  };
};
