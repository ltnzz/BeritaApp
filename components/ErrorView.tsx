import { View, Text, Button } from "react-native";

export default function ErrorView({ message, onRetry }: any) {
  return (
    <View>
      <Text>{String(message)}</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
}