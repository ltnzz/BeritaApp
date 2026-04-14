import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { newsService, Category } from "../services/newsService";

export const useNews = (category: Category) => {
  return useInfiniteQuery({
    queryKey: ["news", category],
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,

    queryFn: async ({ pageParam = 1 }) => {
      const res = await newsService.getTopHeadlines(
        category,
        pageParam as number
      );

      return {
        articles: res.articles ?? [],
        totalResults: res.totalResults ?? 0,
        page: pageParam,
      };
    },

    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (sum, p) => sum + p.articles.length,
        0
      );

      if (totalFetched >= lastPage.totalResults) return undefined;

      return lastPage.page + 1;
    },
  });
};

export const useNewsSearch = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      const res = await newsService.searchArticles(debouncedQuery);
      return res.articles ?? [];
    },
    enabled: debouncedQuery.length >= 3,
    staleTime: 2 * 60 * 1000,
  });
};

  