import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlat, updatePlat, deletePlat, PlatInput } from "../api/plats.api";

export function useCreatePlat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (plat: PlatInput) => createPlat(plat),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["plats"] }),
  });
}

export function useUpdatePlat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, plat }: { id: number; plat: PlatInput }) => updatePlat(id, plat),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["plats"] }),
  });
}

export function useDeletePlat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePlat(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["plats"] }),
  });
}