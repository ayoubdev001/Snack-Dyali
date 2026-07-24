import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

type PlatCardProps = {
  nom: string;
  prix: number;
  categorie: string;
  disponible: boolean;
  onToggle: (value: boolean) => void;
};

export default function PlatCard({ nom, prix, categorie, disponible }: PlatCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.nom}>{nom}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{categorie}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.prix}>{prix.toFixed(2)} DH</Text>
        <View style={[styles.badge, disponible ? styles.available : styles.unavailable]}>
          <Text style={[styles.badgeText, disponible ? styles.availableText : styles.unavailableText]}>
            {disponible ? "Available" : "Unavailable"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 30,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: "#050505",
    shadowOpacity: 0.09,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  left:
   { flex: 1 },
  nom:
   { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 6 },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryText:
   { fontSize: 12, color: COLORS.textSecondary, fontWeight: "500" },
  right:
   { alignItems: "flex-end" },
  prix:
   { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 6 },
  badge:
   { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  available:
   { backgroundColor: COLORS.available },
  unavailable:
   { backgroundColor: COLORS.unavailable },
  badgeText:
   { fontSize: 12, fontWeight: "600" },
  availableText:
   { color: COLORS.availableText },
  unavailableText:
   { color: COLORS.unavailableText },
});