import { useEffect, useState } from "react";
import { getRecent } from "../services/phishingService";

export function useRecent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecent()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}