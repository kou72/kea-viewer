import { useState, useEffect } from "react";

interface CsvData {
  address: string;
  hwaddr: string;
  hostname: string;
}

export const useCsvData = () => {
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCsvData = async () => {
    try {
      const response = await fetch("/api/leases");
      const data = await response.json();
      setCsvData(data);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchCsvData();
  }, []);

  return { csvData, error };
};
