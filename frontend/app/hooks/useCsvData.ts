import { useState, useEffect, useCallback } from "react";

interface Config {
  refreshInterval: number;
  csvPath: string;
}

interface CsvData {
  address: string;
  hwaddr: string;
  hostname: string;
}

export const useCsvData = (autoRefresh: boolean = false) => {
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<Config | null>(null);

  const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "3001";

  const fetchConfig = async () => {
    try {
      const host = window.location.hostname;
      const response = await fetch(`http://${host}:${backendPort}/api/config`);
      const configData = await response.json();
      setConfig(configData);
    } catch (err) {
      setError(String(err));
    }
  };

  const fetchCsvData = useCallback(async () => {
    try {
      const host = window.location.hostname;
      const response = await fetch(`http://${host}:${backendPort}/api/leases/v4`);
      const data = await response.json();
      setCsvData(data);
      setError(null);
    } catch (err) {
      setError(String(err));
    }
  }, [backendPort]);

  const refresh = useCallback(async () => {
    await fetchCsvData();
  }, [fetchCsvData]);

  useEffect(() => {
    fetchConfig();
  }, []);

  useEffect(() => {
    fetchCsvData();
  }, [fetchCsvData]);

  useEffect(() => {
    if (!autoRefresh || !config) return;

    const interval = setInterval(() => {
      fetchCsvData();
    }, config.refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, config, fetchCsvData]);

  return {
    csvData,
    error,
    refresh,
    config,
  };
};
