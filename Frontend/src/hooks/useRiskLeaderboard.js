import { useEffect, useState } from "react";
import { getRiskLeaderboard } from "../services/phishingService";

export function useRiskLeaderboard() {
  const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRiskLeaderboard()
    .then(setData)
    .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}