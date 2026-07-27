import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import { getPlats } from "../api/plats.api";
import { savePlatsToCache } from "../storage/cache";

export const SYNC_TASK_NAME = "snack-bar-sync-task";


export async function runSyncNow(): Promise<void> {
  const plats = await getPlats();
  await savePlatsToCache(plats);
}


TaskManager.defineTask(SYNC_TASK_NAME, async () => {
  try {
    await runSyncNow();
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.error("Background sync failed:", error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});


export async function registerBackgroundSync(): Promise<void> {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(SYNC_TASK_NAME);
  if (isRegistered) return;

  await BackgroundTask.registerTaskAsync(SYNC_TASK_NAME, {
    minimumInterval: 15 * 60, 
  });
}