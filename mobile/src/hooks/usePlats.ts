import { useQuery } from "@tanstack/react-query";
import { getPlats } from "../api/plats.api";

export function usePlats() {
  return useQuery({
    queryKey: ["plats"],
    queryFn: getPlats,
  });
}