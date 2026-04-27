export default function RiskLeaderboard({ data }) {
  const getRiskColor = (score) => {
    if (score >= 70) return "#ef4444";
    if (score >= 40) return "#f59e0b";
    return "#10b981";
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Risk Leaderboard</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "center", color: "#94a3b8" }}>
            <th>Country</th>
            <th>Attacks</th>
            <th>Avg Score</th>
            <th>Risk</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #334155" }}>
              <td>{item.country_name}</td>
              <td>{item.count}</td>
              <td>{item.avg_score}</td>
              <td>
                <span
                  style={{
                    color: getRiskColor(item.avg_score),
                    fontWeight: "bold",
                  }}
                >
                  ●
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}