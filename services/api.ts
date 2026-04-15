import axios from "axios";
import Constants from "expo-constants";

const EXTRA = Constants.expoConfig?.extra;

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_NEWS_API_URL;

if (!API_KEY) {
  console.warn("❌ NEWS_API_KEY belum ke-load");
}
if (!BASE_URL) {
  console.warn("❌ NEWS_API_URL belum ke-load");
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  config.params = {
    ...(config.params || {}),
    apiKey: API_KEY,
  };

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("ERROR FULL:", err);
    console.log("ERROR RESPONSE:", err.response?.data);
    return Promise.reject(err);
  }
);

export default api;
