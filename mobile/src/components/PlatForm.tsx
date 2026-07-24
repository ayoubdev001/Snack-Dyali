import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { platSchema } from "../schemas/plat.schema";
import { COLORS } from "../constants/theme";

type PlatFormProps = {
  initialValues?: { nom: string; prix: number; categorie: string; disponible: boolean };
  onSubmit: (data: { nom: string; prix: number; categorie: string; disponible: boolean }) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  submitLabel: string;
};

export default function PlatForm({ initialValues, onSubmit, onCancel, isSubmitting, submitLabel }: PlatFormProps) {
  const [nom, setNom] = useState(initialValues?.nom ?? "");
  const [prix, setPrix] = useState(initialValues?.prix?.toString() ?? "");
  const [categorie, setCategorie] = useState(initialValues?.categorie ?? "");
  const [disponible, setDisponible] = useState(initialValues?.disponible ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
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
    onSubmit(result.data);
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

      <TouchableOpacity style={[styles.saveButton, isSubmitting && { opacity: 0.6 }]} onPress={handleSubmit} disabled={isSubmitting}>
        <Text style={styles.saveButtonText}>{isSubmitting ? "Saving..." : submitLabel}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
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