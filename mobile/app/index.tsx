import { useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import PlatCard from "../src/components/PlatCard";
import { usePlats } from "../src/hooks/usePlats";
import { useUpdatePlat } from "../src/hooks/usePlatMutations";
import { COLORS } from "../src/constants/theme";

export default function ListScreen() {
  const router = useRouter();
  const { data: plats, isLoading, isError, error, refetch } = usePlats();
  const updatePlat = useUpdatePlat();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set((plats ?? []).map((p) => p.categorie))],
    [plats]
  );

  const filteredPlats = (plats ?? []).filter((p) => {
    return activeCategory === "All" || p.categorie === activeCategory;
  });

  return (
    <View style={styles.container}>
      <View style={styles.syncBanner}>
        <Text style={styles.syncText}>Last sync: —</Text>
        <TouchableOpacity style={styles.syncButton} onPress={() => refetch()}>
          <Text style={styles.syncButtonText}>Force Sync</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.chipRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.chip, activeCategory === item && styles.chipActive]}
            onPress={() => setActiveCategory(item)}
          >
            <Text style={[styles.chipText, activeCategory === item && styles.chipTextActive]}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {isLoading && <ActivityIndicator style={{ marginTop: 40 }} color={COLORS.primary} />}

      {isError && (
        <View style={{ padding: 20 }}>
          <Text style={{ color: "#DC2626" }}>Failed to load: {error.message}</Text>
        </View>
      )}

      {!isLoading && !isError && (
        <FlatList
          data={filteredPlats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/plat/${item.id}`)}>
              <PlatCard
                nom={item.nom}
                prix={Number(item.prix)}
                categorie={item.categorie}
                disponible={item.disponible}
                onToggle={(value) =>
                  updatePlat.mutate({
                    id: item.id,
                    plat: {
                      nom: item.nom,
                      prix: Number(item.prix),
                      categorie: item.categorie,
                      disponible: value,
                    },
                  })
                }
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 90 }}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => router.push("/plat/new")}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  syncBanner: {
    backgroundColor: "#E8F5E9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  syncText:
   { color: COLORS.primaryDark, fontWeight: "500" },
  syncButton:
   { backgroundColor: COLORS.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  syncButtonText:
   { color: "#fff", fontWeight: "600", fontSize: 13 },
 chipRow: 
 { paddingHorizontal: 15, paddingVertical: 5, gap: 5, height: 50, margin:10 },
  chip:
   { borderWidth: 1, borderColor: COLORS.border, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, marginRight: 8 },
  chipActive:
   { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText:
   { color: COLORS.textSecondary, fontWeight: "500" },
  chipTextActive:
   { color: "#fff" },
  fab: {
    position: "absolute", bottom: 24, right: 24,
    backgroundColor: COLORS.primary, width: 56, height: 56, borderRadius: 28,
    alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 6, elevation: 4,
  },
  fabIcon: { color: "#fff", fontSize: 28, lineHeight: 30 },
});