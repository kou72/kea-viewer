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
    <div className="p-4 bg-gray-900">
      <div className="overflow-hidden rounded-lg shadow-lg bg-gray-800">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-4 text-left text-white font-bold">Address</th>
              <th className="p-4 text-left text-white font-bold">Hardware Address</th>
              <th className="p-4 text-left text-white font-bold">Hostname</th>
            </tr>
          </thead>
          <tbody>
            {uniqueData.map((row, index) => (
              <tr 
                key={index}
                className="hover:bg-gray-700 even:bg-gray-800 odd:bg-gray-750"
              >
                <td className="p-4 text-gray-200">{row.address}</td>
                <td className="p-4 text-gray-200">{row.hwaddr}</td>
                <td className="p-4 text-gray-200">{row.hostname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};