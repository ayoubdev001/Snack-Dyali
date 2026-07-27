import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

type SyncBannerProps = {
  lastSyncLabel: string;      // e.g. "2 min ago", "Just now", "—"
  isOffline?: boolean;        // true → shows red "Offline Mode" banner instead
  isSyncing?: boolean;        // true → disables button + shows "Syncing..."
  onForceSync: () => void;
};

export default function SyncBanner({ lastSyncLabel, isOffline, isSyncing, onForceSync }: SyncBannerProps) {
  return (
    <View style={[styles.banner, isOffline && styles.offlineBanner]}>
      <Text style={[styles.text, isOffline && styles.offlineText]}>
        {isOffline ? "⚠ Offline Mode — showing cached data" : `Last sync: ${lastSyncLabel}`}
      </Text>

      <TouchableOpacity
        style={[styles.button, isSyncing && { opacity: 0.6 }]}
        onPress={onForceSync}
        disabled={isSyncing}
      >
        <Text style={styles.buttonText}>{isSyncing ? "Syncing..." : "Force Sync"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#E8F5E9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  offlineBanner: {
    backgroundColor: "#FEE2E2",
  },
  text: { color: COLORS.primaryDark, fontWeight: "500", flexShrink: 1, marginRight: 8 },
  offlineText: { color: "#991B1B" },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 13 },
});