import { z } from "zod";

export const platSchema = z.object({
  nom: z.string().trim().min(1, "Dish name is required"),
  prix: z
    .number({ error: "Price must be a number" })
    .min(0, "Price must not be negative"),
  categorie: z.string().trim().min(1, "Category is required"),
  disponible: z.boolean().optional(),
});

export type PlatFormData = z.infer<typeof platSchema>;