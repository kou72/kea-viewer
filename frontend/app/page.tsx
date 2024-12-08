"use client";

import Image from "next/image";
import { CsvTable } from "@/app/components/CsvTable";
import { useCsvData } from "@/app/hooks/useCsvData";

export default function Home() {
  const { csvData, error } = useCsvData();

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900">
      <CsvTable data={csvData} />
    </div>
  );
}
