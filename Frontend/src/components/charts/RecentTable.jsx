import "../../styles/global.css";

export default function RecentTable({ data }) {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="recent-table-container">
      <h1 className="recent-table-title">Recent Events</h1>

      <div className="table-wrapper">
        <table className="recent-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>URL</th>
              <th>Country</th>
              <th>Domain</th>
              <th>Score</th>
              <th>Date Detected</th>
            </tr>
          </thead>

          <tbody>
            {safeData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td className="url-cell">
                  {item.url}
                </td>

                <td>{item.country_name}</td>
                <td>{item.domain}</td>

                <td
                  className={
                    item.score >= 70
                      ? "score-high"
                      : item.score >= 40
                      ? "score-medium"
                      : "score-low"
                  }
                >
                  {item.score}
                </td>

                <td>
                  {new Date(item.date_detected).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}