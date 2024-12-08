import { useState, useEffect, useCallback } from "react";

const REFRESH_INTERVAL = 5000; // 5 seconds

interface CsvData {
  address: string;
  hwaddr: string;
  hostname: string;
}

export const useCsvData = (autoRefresh: boolean = false) => {
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCsvData = useCallback(async () => {
    try {
      const response = await fetch("/api/leases");
      const data = await response.json();
      setCsvData(data);
      setError(null);
    } catch (err) {
      setError(String(err));
    }
  }, []);

  const refresh = () => {
    fetchCsvData();
  };

  useEffect(() => {
    fetchCsvData();
  }, [fetchCsvData]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchCsvData();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [autoRefresh, fetchCsvData]);

  return { csvData, error, refresh };
};
