"use client";

import { CsvTable } from "@/app/components/CsvTable";
import { useCsvData } from "@/app/hooks/useCsvData";

export default function Home() {
  const { csvData, error } = useCsvData();

  if (error) return <div className="text-zinc-500">{error}</div>;

  return (
    <div className="min-h-screen bg-zinc-800">
      <CsvTable data={csvData} />
    </div>
  );
}
