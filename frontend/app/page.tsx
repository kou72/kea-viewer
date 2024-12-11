"use client";

import { useState } from "react";
import { CsvTable } from "@/app/components/CsvTable";
import { Header } from "@/app/components/Header";
import { useCsvData } from "@/app/hooks/useCsvData";

export default function Home() {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const { csvData, error, refresh, refreshInterval, csvPath } = useCsvData(autoRefresh);

  return (
    <div className="min-h-screen bg-zinc-800">
      <div className="p-8 min-h-screen bg-teal-950/30">
        <div className="max-w-7xl mx-auto">
          <Header
            onRefresh={refresh}
            autoRefresh={autoRefresh}
            onAutoRefreshToggle={setAutoRefresh}
            refreshInterval={refreshInterval}
            csvPath={csvPath}
          />
          {error && <div className="text-red-400 mb-4">{error}</div>}
          <CsvTable data={csvData} />
        </div>
      </div>
    </div>
  );
}
