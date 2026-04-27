import { useCountryStats } from "../hooks/useCountryStats";
import CountryChart from "../components/charts/CountryChart";

import RecentChart from "../components/charts/RecentChart";
import { useRecent } from "../hooks/useRecent";

import RiskLeaderboard from "../components/charts/RiskLeaderboard";
import { useRiskLeaderboard } from "../hooks/useRiskLeaderboard";

import RecentTable from "../components/charts/RecentTable";
import { useRecentTable } from "../hooks/useRecentTable";

import "../styles/global.css";

export default function Dashboard() {
  const { data, loading } = useCountryStats();
  const { data: recentData, loading: recentLoading } = useRecent();
  const { data: riskData, loading: riskLoading } = useRiskLeaderboard();
  const recentDataTable = useRecent();

  const totalCountries = data?.length || 0;
  const totalEvents = recentData?.length || 0;

  return (
    <div id="dashboard" className="dashboard-container">
      <h1 className="dashboard-title">PhishInsight Dashboard</h1>

      {/* KPI CARDS */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <h3>Total Countries</h3>
          <p>{totalCountries}</p>
        </div>

        <div className="kpi-card">
          <h3>Recent Events</h3>
          <p>{totalEvents}</p>
        </div>

        <div className="kpi-card">
          <h3>Status</h3>
          <p className="status-ok">Active</p>
        </div>
      </div>

      {/* CHART GRID */}
      <div className="chart-grid">
        <div className="chart-card">
          {loading ? <p>Loading data...</p> : <CountryChart data={data} />}
        </div>

        <div className="chart-card">
          {riskLoading ? (
            <p>Loading risk data...</p>
          ) : (
            <RiskLeaderboard data={riskData} />
          )}
        </div>

        <div className="chart-card">
          {recentLoading ? (
            <p>Loading recent data...</p>
          ) : (
            <RecentChart data={recentData} />
          )}
        </div>

        <div className="chart-card">
          {recentLoading ? (
            <p>Loading recent data...</p>
          ) : (
            <RecentTable data={recentData} />
          )}
        </div>
      </div>
    </div>
  );
}
