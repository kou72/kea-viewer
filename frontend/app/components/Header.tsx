import { RefreshCw, PlayCircle, PauseCircle } from "lucide-react";

interface HeaderProps {
  onRefresh: () => void;
  autoRefresh: boolean;
  onAutoRefreshToggle: (value: boolean) => void;
}

export const Header = ({ onRefresh, autoRefresh, onAutoRefreshToggle }: HeaderProps) => {
  const REFRESH_INTERVAL = 5; // seconds

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
          title={autoRefresh ? "Stop auto refresh" : `Start auto refresh (${REFRESH_INTERVAL}s)`}
        >
          {autoRefresh ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
          <span className="text-sm">{autoRefresh ? `Auto (${REFRESH_INTERVAL}s)` : "Auto"}</span>
        </button>
      </div>
      <div className="text-sm text-gray-400">Source: /var/lib/kea/kea-leases4.csv</div>
    </div>
  );
};
