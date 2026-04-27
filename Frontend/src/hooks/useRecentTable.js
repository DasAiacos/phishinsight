import { useEffect, useState } from "react";
import { getRecent } from "../services/phishingService";

export function useRecentTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecent()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}