import { z } from "zod";
export const Product = z.object({
  id: z.string(), title: z.string(), brand: z.string().optional().default(""),
  image: z.string().url().optional().default(""), price: z.number(),
  currency: z.string().min(3).max(3), rating: z.number().min(0).max(5).optional().default(0),
  sizes: z.array(z.string()).optional().default([]), color: z.string().optional().default(""),
  availability: z.enum(["in_stock","oos","limited"]).default("in_stock"),
  url: z.string().url(), merchant: z.string().default(""),
});
export type Product = z.infer<typeof Product>;

export const AffiliateLink = z.object({ affiliateUrl: z.string().url(), merchantId: z.string().optional(), program: z.enum(["amazon","rakuten","awin","none"]), expiresAt: z.string().datetime().optional(), nonAffiliate: z.boolean().optional().default(false) });
export type AffiliateLink = z.infer<typeof AffiliateLink>;

export const OutfitItem = z.object({ role: z.string(), product: Product, link: AffiliateLink.optional() });
export type OutfitItem = z.infer<typeof OutfitItem>;

export const Outfit = z.object({ id: z.string(), label: z.enum(["Safe","Standout","Wildcard"]), items: z.array(OutfitItem).min(6).max(10), why: z.array(z.string()).min(3).max(5) });
export type Outfit = z.infer<typeof Outfit>;

export const StyleBrief = z.object({
  gender: z.enum(["female","male","unisex"]).default("female"),
  bodyType: z.enum(["petite","tall","curvy","athletic","average"]).default("average"),
  sizes: z.array(z.string()).default([]), budget: z.enum(["$","$$","$$$"]).default("$$"),
  colors: z.array(z.string()).default([]), occasion: z.array(z.string()).min(1),
  climate: z.enum(["cold","mild","warm","hot"]).default("mild"),
  vibe: z.array(z.string()).default([]),
  region: z.enum(["EU","US"]).default("EU"), currency: z.enum(["EUR","USD"]).default("EUR"),
});
export type StyleBrief = z.infer<typeof StyleBrief>;

export const SavedSet = z.object({ id: z.string(), userId: z.string(), createdAt: z.string(), brief: StyleBrief, outfits: z.array(Outfit) });
export type SavedSet = z.infer<typeof SavedSet>;

export const ApiResponse = z.object({ ok: z.boolean(), data: z.any().optional(), error: z.string().optional() });
export type ApiResponse = z.infer<typeof ApiResponse>;
