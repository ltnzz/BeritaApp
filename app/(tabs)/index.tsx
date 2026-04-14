import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "../../context/ThemeContext";

import { useBookmarks } from "../../hooks/useBookmarks";
import { useNews } from "../../hooks/useNews";

import { useSearch } from "../../context/SearchContext";
import { useDebounce } from "../../hooks/useDebounce";
import { useNewsSearch } from "../../hooks/useNewsSearch";

import CategoryFilter from "../../components/CategoryFilter";
import ErrorView from "../../components/ErrorView";
import NewsCard from "../../components/NewsCard";
import NewsSkeletonList from "../../components/NewsSkeletonList";

import FilterBar from "../../components/FilterBar";

import type { Article, Category } from "../../type/index";

const CATEGORIES: { label: string; value: Category }[] = [
  { label: "Umum", value: "general" },
  { label: "Teknologi", value: "technology" },
  { label: "Olahraga", value: "sports" },
  { label: "Bisnis", value: "business" },
  { label: "Kesehatan", value: "health" },
];

export default function HomeScreen() {
  const { isDark } = useTheme();

  const [category, setCategory] = useState<Category>("general");

  const router = useRouter();
  const { bookmarks, toggleBookmark } = useBookmarks();

  const { search, setSearch } = useSearch();
  const debouncedSearch = useDebounce(search, 500);
  const isSearching = debouncedSearch.trim().length > 0;

  const { data: searchResults, loading: searchLoading } =
    useNewsSearch(debouncedSearch);

  const [filter, setFilter] = useState({
    source: "",
    from: "",
    to: "",
  });

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNews(category);

  const articles: Article[] = useMemo(() => {
    if (isSearching) return searchResults ?? [];

    return (
      data?.pages
        ?.flatMap((page: any) => page?.articles ?? [])
        ?.filter((item: any) => !!item?.url) ?? []
    );
  }, [data, searchResults, isSearching]);

  const isBookmarked = useCallback(
    (url: string) => bookmarks.some((b) => b.url === url),
    [bookmarks],
  );

  const handlePressArticle = useCallback(
    (url: string) => {
      router.push(`/news/${encodeURIComponent(url)}`);
    },
    [router],
  );

  const renderItem = useCallback(
    ({ item }: { item: Article }) => (
      <NewsCard
        article={item}
        onPress={() => handlePressArticle(item.url)}
        onBookmark={() => toggleBookmark(item)}
        isBookmarked={isBookmarked(item.url)}
      />
    ),
    [handlePressArticle, toggleBookmark, isBookmarked],
  );

  if (isLoading && articles.length === 0 && !isSearching) {
    return <NewsSkeletonList />;
  }

  if (isError) {
    return (
      <ErrorView
        message={error?.message ?? "Terjadi kesalahan"}
        onRetry={refetch}
      />
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0B1220" : "#F4F6F8" },
      ]}
    >
      <View style={styles.searchContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Cari berita..."
          placeholderTextColor="#999"
          style={[
            styles.searchInput,
            {
              backgroundColor: isDark ? "#111827" : "#fff",
              color: isDark ? "#fff" : "#111",
            },
          ]}
        />

        {search.length > 0 && (
          <Text onPress={() => setSearch("")} style={styles.clearText}>
            ✕
          </Text>
        )}
      </View>

      {!isSearching && (
        <>
          <CategoryFilter
            categories={CATEGORIES}
            selected={category}
            onChange={setCategory}
          />

          <FilterBar filter={filter} setFilter={setFilter} />
        </>
      )}

      {searchLoading && isSearching && (
        <ActivityIndicator style={{ marginTop: 10 }} />
      )}

      {isSearching && articles.length === 0 && !searchLoading && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No results found 🔍
        </Text>
      )}

      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.url ?? index.toString()}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        onEndReached={() => {
          if (!isSearching && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  searchContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 10,
    position: "relative",
  },

  searchInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,

    fontSize: 14,
    color: "#111",

    paddingRight: 40,

    // shadow iOS
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    // shadow Android
    elevation: 3,
  },

  clearText: {
    position: "absolute",
    right: 14,
    top: 10,
    fontSize: 18,
    color: "#999",
    fontWeight: "600",
  },
});
