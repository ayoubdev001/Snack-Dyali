import { View, Text, StyleSheet } from "react-native";

export default function ListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snack Bar Menu</Text>
      <Text>List of dishes will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
});