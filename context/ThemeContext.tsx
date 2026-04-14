import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeType = "light" | "dark";

type ThemeContextProps = {
  theme: ThemeType;
  toggleTheme: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextProps | null>(null);

const KEY = "APP_THEME";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(
    systemTheme === "dark" ? "dark" : "light",
  );

  // load saved theme
  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem(KEY);
      if (saved) {
        setTheme(saved as ThemeType);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    await AsyncStorage.setItem(KEY, next);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isDark: theme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
