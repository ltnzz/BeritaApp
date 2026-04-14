import React, { createContext, useContext, useState } from "react";

type SearchContextType = {
  search: string;
  setSearch: (v: string) => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: any) {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside provider");
  return ctx;
}