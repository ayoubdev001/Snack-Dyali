import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function PlatDetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details for dish #{id}</Text>
    </View>
  );
}