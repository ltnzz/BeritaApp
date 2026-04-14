import "dotenv/config";

export default {
  expo: {
    name: "BeritaApp",
    slug: "Berita-App",
    extra: {
      newsApiKey: process.env.NEWS_API_KEY,
      newsApiBaseUrl: process.env.NEWS_API_URL,
    },
  },
};
