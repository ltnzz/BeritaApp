import { View, FlatList, Text } from "react-native";
import { useBookmarks } from "../../hooks/useBookmarks";
import NewsCard from "../../components/NewsCard";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function BookmarksScreen() {
  const router = useRouter();
  const { bookmarks, toggleBookmark, reload } = useBookmarks();

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [])
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>

      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            onPress={() =>
              router.push(`/news/${encodeURIComponent(item.url)}`)
            }
            onBookmark={() => toggleBookmark(item)}
            isBookmarked={true}
          />
        )}
      />
    </View>
  );
}