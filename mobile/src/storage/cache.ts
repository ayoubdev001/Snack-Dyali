import AsyncStorage from "@react-native-async-storage/async-storage";
import { Plat } from "../api/plats.api";

const PLATS_CACHE_KEY = "cache:plats";
const LAST_SYNC_KEY = "cache:lastSync";

export async function savePlatsToCache(plats: Plat[]): Promise<void> {
  const timestamp = new Date().toISOString();
  await AsyncStorage.setItem(PLATS_CACHE_KEY, JSON.stringify(plats));
  await AsyncStorage.setItem(LAST_SYNC_KEY, timestamp);
}

export async function getCachedPlats(): Promise<Plat[] | null> {
  const raw = await AsyncStorage.getItem(PLATS_CACHE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function getLastSyncTimestamp(): Promise<string | null> {
  return AsyncStorage.getItem(LAST_SYNC_KEY);
}