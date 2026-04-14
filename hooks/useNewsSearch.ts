import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_NEWS_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;

export function useNewsSearch(query: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${BASE_URL}/everything`, {
          params: {
            q: query,
            apiKey: API_KEY,
            language: "en",
          },
        });

        setData(res.data.articles || []);
      } catch (e) {
        console.log("search error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { data, loading };
}