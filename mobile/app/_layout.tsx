import { Stack } from "expo-router";
import QueryProvider from "../src/providers/QueryProvider";

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Menu" }} />
        <Stack.Screen name="plat/new" options={{ title: "Add Dish" }} />
        <Stack.Screen name="plat/[id]/edit" options={{ title: "Edit Dish" }} />
        <Stack.Screen name="plat/[id]/index" options={{ title: "Dish Details" }} />
      </Stack>
    </QueryProvider>
  );
}