import { View, TextInput, Text, StyleSheet } from "react-native";

export default function FilterBar({ filter, setFilter }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Source</Text>
      <TextInput
        placeholder="cnn, bbc, reuters"
        value={filter.source}
        onChangeText={(t) =>
          setFilter((prev: any) => ({ ...prev, source: t }))
        }
        style={styles.input}
      />

      <Text style={styles.label}>From Date</Text>
      <TextInput
        placeholder="2026-04-01"
        value={filter.from}
        onChangeText={(t) =>
          setFilter((prev: any) => ({ ...prev, from: t }))
        }
        style={styles.input}
      />

      <Text style={styles.label}>To Date</Text>
      <TextInput
        placeholder="2026-04-14"
        value={filter.to}
        onChangeText={(t) =>
          setFilter((prev: any) => ({ ...prev, to: t }))
        }
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
});