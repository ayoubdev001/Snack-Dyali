import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { platSchema } from "../../src/schemas/plat.schema";
import { useCreatePlat } from "../../src/hooks/usePlatMutations";
import { COLORS } from "../../src/constants/theme";

export default function NewPlatScreen() {
  const router = useRouter();
  const createPlat = useCreatePlat();

  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");
  const [disponible, setDisponible] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const result = platSchema.safeParse({ nom, prix: Number(prix), categorie, disponible });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    createPlat.mutate(result.data, {
      onSuccess: () => router.back(),
      onError: (err) => Alert.alert("Error", err.message),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name</Text>
      <TextInput style={styles.input} value={nom} onChangeText={setNom} placeholder="Enter dish name" />
      {errors.nom && <Text style={styles.error}>{errors.nom}</Text>}

      <Text style={styles.label}>Price</Text>
      <TextInput style={styles.input} value={prix} onChangeText={setPrix} placeholder="0.00" keyboardType="decimal-pad" />
      {errors.prix && <Text style={styles.error}>{errors.prix}</Text>}

      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={categorie} onChangeText={setCategorie} placeholder="e.g. Tacos" />
      {errors.categorie && <Text style={styles.error}>{errors.categorie}</Text>}

      <View style={styles.switchRow}>
        <Text style={styles.label}>Available</Text>
        <Switch value={disponible} onValueChange={setDisponible} trackColor={{ true: COLORS.primary }} />
      </View>

      <TouchableOpacity style={[styles.saveButton, createPlat.isPending && { opacity: 0.6 }]} onPress={handleSave} disabled={createPlat.isPending}>
        <Text style={styles.saveButtonText}>{createPlat.isPending ? "Saving..." : "Save"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  label: { fontSize: 14, fontWeight: "600", marginTop: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  error: { color: "#DC2626", fontSize: 12, marginTop: 4 },
  switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16 },
  saveButton: { backgroundColor: COLORS.primary, borderRadius: 10, paddingVertical: 14, alignItems: "center", marginTop: 24 },
  saveButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  cancelButton: { backgroundColor: "#9E9E9E", borderRadius: 10, paddingVertical: 14, alignItems: "center", marginTop: 10 },
  cancelButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});