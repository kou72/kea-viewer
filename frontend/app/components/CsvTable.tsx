interface CsvData {
  address: string;
  hwaddr: string;
  hostname: string;
}

interface CsvTableProps {
  data: CsvData[];
}

export const CsvTable = ({ data }: CsvTableProps) => {
  const uniqueData = Object.values(
    data.reduce((acc, item) => {
      acc[item.hwaddr] = item;
      return acc;
    }, {} as Record<string, CsvData>)
  );

  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-teal-900/50">
              <th className="p-4 text-left text-gray-100 font-bold">Address</th>
              <th className="p-4 text-left text-gray-100 font-bold">Hardware Address</th>
              <th className="p-4 text-left text-gray-100 font-bold">Hostname</th>
            </tr>
          </thead>
          <tbody>
            {uniqueData.map((row, index) => (
              <tr key={index} className="hover:bg-teal-900 even:bg-teal-950 odd:bg-teal-950/80">
                <td className="p-4 text-gray-300">{row.address}</td>
                <td className="p-4 text-gray-300">{row.hwaddr}</td>
                <td className="p-4 text-gray-300">{row.hostname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
