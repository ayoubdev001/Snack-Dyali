import api from "./axiosInstance";

export type Plat = {
  id: number;
  nom: string;
  prix: number;
  categorie: string;
  disponible: boolean;
  created_at: string;
};

export type PlatInput = {
  nom: string;
  prix: number;
  categorie: string;
  disponible?: boolean;
};

export const getPlats = async (): Promise<Plat[]> => {
  const { data } = await api.get("/api/plats");
  return data;
};

export const getPlat = async (id: number): Promise<Plat> => {
  const { data } = await api.get(`/api/plats/${id}`);
  return data;
};

export const createPlat = async (plat: PlatInput): Promise<Plat> => {
  const { data } = await api.post("/api/plats", plat);
  return data;
};

export const updatePlat = async (id: number, plat: PlatInput): Promise<Plat> => {
  const { data } = await api.put(`/api/plats/${id}`, plat);
  return data;
};

export const deletePlat = async (id: number): Promise<void> => {
  await api.delete(`/api/plats/${id}`);
};