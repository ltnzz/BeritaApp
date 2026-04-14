import { Text, View } from "react-native";

export default function Header({ title }: { title: string }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
    </View>
  );
}
