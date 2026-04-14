import React from "react";
import { View, StyleSheet } from "react-native";

export default function NewsSkeletonList() {
  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.image} />
          <View style={styles.title} />
          <View style={styles.desc} />
          <View style={styles.descShort} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
  },
  image: {
    height: 180,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  title: {
    height: 20,
    backgroundColor: "#e0e0e0",
    marginTop: 10,
    width: "80%",
    borderRadius: 6,
  },
  desc: {
    height: 15,
    backgroundColor: "#e0e0e0",
    marginTop: 6,
    width: "100%",
    borderRadius: 6,
  },
  descShort: {
    height: 15,
    backgroundColor: "#e0e0e0",
    marginTop: 6,
    width: "60%",
    borderRadius: 6,
  },
});