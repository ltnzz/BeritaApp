import api from "./api";

export type Category =
  | "general"
  | "technology"
  | "sports"
  | "business"
  | "health";

type NewsResponse = {
  articles: any[];
  totalResults: number;
};

export const newsService = {
  getTopHeadlines: async (
    category: Category = "general",
    page: number = 1,
  ): Promise<NewsResponse> => {
    const { data } = await api.get("/top-headlines", {
      params: {
        country: "us",
        category,
        page,
        pageSize: 10,
      },
    });

    return {
      articles: data.articles ?? [],
      totalResults: data.totalResults ?? 0,
    };

  },

  searchArticles: async (
    query: string,
    page: number = 1,
  ): Promise<NewsResponse> => {
    const { data } = await api.get("/everything", {
      params: {
        q: query,
        language: "id",
        sortBy: "publishedAt",
        page,
        pageSize: 10,
      },
    });

    return {
      articles: data.articles ?? [],
      totalResults: data.totalResults ?? 0,
    };
  },

  getSources: async (category?: Category) => {
    const { data } = await api.get("/top-headlines/sources", {
      params: {
        country: "id",
        category,
      },
    });

    return data.sources ?? [];
  },
};
