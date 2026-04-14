import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import type { Article } from "../type";

const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/300x200.png?text=No+Image";

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

interface NewsCardProps {
  article: Article;
  onPress: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
}

export default function NewsCard({
  article,
  onPress,
  onBookmark,
  isBookmarked,
}: NewsCardProps) {
  // ✅ FIX: share harus di dalam component
  const onShare = async () => {
    try {
      await Share.share({
        message: `${article?.title ?? ""}\n${article?.url ?? ""}`,
      });
    } catch (err) {
      console.log("Share error:", err);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: article?.urlToImage || PLACEHOLDER_IMAGE }}
        style={styles.image}
        contentFit="cover"
      />

      {/* SHARE + BOOKMARK ACTIONS */}
      <View style={styles.actions}>
        <Pressable onPress={onShare} style={styles.actionBtn}>
          <Ionicons name="share-social-outline" size={18} color="#64748B" />
        </Pressable>

        <Pressable onPress={onBookmark} style={styles.actionBtn}>
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={18}
            color={isBookmarked ? "#0891B2" : "#64748B"}
          />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.meta}>
          <Text style={styles.source}>
            {article?.source?.name ?? "Unknown"}
          </Text>
          <Text style={styles.date}>{formatDate(article?.publishedAt)}</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {article?.title ?? "No title"}
        </Text>

        <Text style={styles.description} numberOfLines={3}>
          {article?.description ?? "Tidak ada deskripsi"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 180,
  },

  content: {
    padding: 12,
  },

  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  source: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0891B2",
  },

  date: {
    fontSize: 11,
    color: "#94A3B8",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    color: "#475569",
  },

  bookmarkBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 999,
    elevation: 2,
  },

  actions: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    gap: 8,
  },

  actionBtn: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 999,
    elevation: 2,
  },
});
