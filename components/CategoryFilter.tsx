import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { Category } from "../type/index";

type Props = {
  categories: { label: string; value: Category }[];
  selected: Category;
  onChange: (value: Category) => void;
};

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kategori Berita</Text>

      {/* ROW 1 */}
      <View style={styles.row}>
        {categories.slice(0, 3).map((item) => {
          const isActive = selected === item.value;

          return (
            <TouchableOpacity
              key={item.value}
              onPress={() => onChange(item.value)}
              style={[styles.chip, isActive && styles.active]}
            >
              <Text style={[styles.text, isActive && styles.textActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ROW 2 */}
      <View style={styles.row}>
        {categories.slice(3, 5).map((item) => {
          const isActive = selected === item.value;

          return (
            <TouchableOpacity
              key={item.value}
              onPress={() => onChange(item.value)}
              style={[styles.chip, isActive && styles.active]}
            >
              <Text style={[styles.text, isActive && styles.textActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6, 
    color: "#111",
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8, 
  },

  chip: {
    paddingVertical: 7, 
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
  },

  active: {
    backgroundColor: "#000",
  },

  text: {
    fontSize: 13,
    color: "#000",
  },

  textActive: {
    color: "#fff",
  },
});