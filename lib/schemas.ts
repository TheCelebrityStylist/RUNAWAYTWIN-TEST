import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  brand: z.string(),
  image: z.string().url(),
  price: z.number(),
  currency: z.enum(["EUR", "USD"]).default("EUR"),
  rating: z.number().min(0).max(5).default(4.5),
  sizes: z.array(z.string()).default([]),
  color: z.string().default(""),
  availability: z.enum(["in_stock", "oos", "limited"]).default("in_stock"),
  url: z.string().url(),
  merchant: z.string().default("MockMart"),
});
export type Product = z.infer<typeof ProductSchema>;

export const OutfitItemSchema = z.object({
  role: z.string(),
  product: ProductSchema,
});
export const OutfitSchema = z.object({
  id: z.string(),
  label: z.enum(["Safe", "Standout", "Wildcard"]),
  items: z.array(OutfitItemSchema).min(1),
  why: z.array(z.string()).min(1),
});
export type Outfit = z.infer<typeof OutfitSchema>;

export const OutfitsResponseSchema = z.object({
  outfits: z.array(OutfitSchema).length(3),
});
export type OutfitsResponse = z.infer<typeof OutfitsResponseSchema>;

export const StyleBriefSchema = z.object({
  gender: z.string().min(1),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  budget: z.number().optional(),
  currency: z.enum(["EUR", "USD"]).default("EUR"),
  occasion: z.string().optional(),
  climate: z.string().optional(),
  vibe: z.string().optional(),
});
export type StyleBrief = z.infer<typeof StyleBriefSchema>;
