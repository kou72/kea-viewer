import { RefreshCw, PlayCircle, PauseCircle } from "lucide-react";

interface HeaderProps {
  onRefresh: () => void;
  autoRefresh: boolean;
  onAutoRefreshToggle: (value: boolean) => void;
  config: {
    refreshInterval: number;
    csvPath: string;
  } | null;
}

export const Header = ({ onRefresh, autoRefresh, onAutoRefreshToggle, config }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-100">DHCP Leases</h1>
        <button
          onClick={onRefresh}
          className="p-2 text-gray-300 hover:text-gray-100 transition-colors"
          title="Refresh now"
        >
          <RefreshCw size={20} />
        </button>
        <button
          onClick={() => onAutoRefreshToggle(!autoRefresh)}
          className="flex items-center space-x-2 p-2 text-gray-300 hover:text-gray-100 transition-colors"
          title={
            autoRefresh
              ? "Stop auto refresh"
              : `Start auto refresh (${config?.refreshInterval ?? 0}s)`
          }
        >
          {autoRefresh ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
          <span className="text-sm">
            {autoRefresh ? `Auto (${config?.refreshInterval ?? 0}s)` : "Auto"}
          </span>
        </button>
      </div>
      <div className="text-sm text-gray-400">Source: {config?.csvPath ?? "Loading..."}</div>
    </div>
  );
};
