import { useEffect, useState } from "react";
import { getByCountry } from "../services/phishingService";

export function useCountryStats() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getByCountry()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}