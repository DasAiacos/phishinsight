import api from "../api/client";

export const getByCountry = async () => {
  const res = await api.get("/phishing/stats");
  return res.data.by_country;
};

export const getRecent = async () => {
  const res = await api.get("/phishing/recent?limit=20");
  return res.data;
};

export const getRiskLeaderboard = async () => {
  const res = await api.get("/phishing/top-countries");
  return res.data;
};