import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function EditPlatScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Edit form for dish #{id}</Text>
    </View>
  );
}