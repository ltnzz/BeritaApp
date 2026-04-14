import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Article } from "../type";

const STORAGE_KEY = "bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarks = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      setBookmarks(data ? JSON.parse(data) : []);
    } catch (e) {
      console.log("Load error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  // 🔥 save helper
  const save = async (items: Article[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  // 🔥 toggle
  const toggleBookmark = useCallback(async (article: Article) => {
    setBookmarks((prev) => {
      const exists = prev.some((i) => i.url === article.url);

      const updated = exists
        ? prev.filter((i) => i.url !== article.url)
        : [...prev, article];

      save(updated);
      return updated;
    });
  }, []);

  // 🔥 helper
  const isBookmarked = useCallback(
    (url: string) => bookmarks.some((i) => i.url === url),
    [bookmarks]
  );

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    loading,
    reload: loadBookmarks, // 🔥 penting buat sync antar screen
  };
}