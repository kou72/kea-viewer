import { RefreshCw, PlayCircle, PauseCircle } from "lucide-react";

interface HeaderProps {
  csvPath: string;
  refreshInterval: number;
  refresh: () => void;
  autoRefresh: boolean;
  setAutoRefresh: (value: boolean) => void;
}

export const Header = ({
  refresh,
  autoRefresh,
  setAutoRefresh,
  refreshInterval,
  csvPath,
}: HeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <AppTitle />
        <RefreshButton onRefresh={refresh} />
        <AutoRefreshButton
          autoRefresh={autoRefresh}
          onAutoRefreshToggle={setAutoRefresh}
          refreshInterval={refreshInterval}
        />
      </div>
      <CsvPath csvPath={csvPath} />
    </div>
  );
};

const AppTitle = () => {
  return <h1 className="text-2xl font-bold text-gray-100">DHCP Leases</h1>;
};

interface RefreshButtonProps {
  onRefresh: () => void;
}

const RefreshButton = ({ onRefresh }: RefreshButtonProps) => {
  return (
    <button
      onClick={onRefresh}
      className="p-2 text-gray-300 hover:text-gray-100 transition-colors"
      title="Refresh now"
    >
      <RefreshCw size={20} />
    </button>
  );
};

interface AutoRefreshButtonProps {
  autoRefresh: boolean;
  onAutoRefreshToggle: (value: boolean) => void;
  refreshInterval: number;
}

const AutoRefreshButton = ({
  autoRefresh,
  onAutoRefreshToggle,
  refreshInterval,
}: AutoRefreshButtonProps) => {
  return (
    <button
      onClick={() => onAutoRefreshToggle(!autoRefresh)}
      className="flex items-center space-x-2 p-2 text-gray-300 hover:text-gray-100 transition-colors"
      title={autoRefresh ? "Stop auto refresh" : `Start auto refresh (${refreshInterval ?? 0}s)`}
    >
      {autoRefresh ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
      <span className="text-sm">{autoRefresh ? `Auto (${refreshInterval ?? 0}s)` : "Auto"}</span>
    </button>
  );
};

const CsvPath = ({ csvPath }: { csvPath: string }) => {
  return <div className="text-sm text-gray-400">Source: {csvPath ?? "Loading..."}</div>;
};
