// lib/affiliates/unified.ts
import { z } from "zod";
import { ProductSchema, type Product } from "../schemas";

/**
 * All supported provider names (include 'mock' so dev builds never break).
 */
export type ProviderName = "amazon" | "rakuten" | "awin" | "mock";

/**
 * Unified product type used across providers (inferred from Zod schema).
 * IMPORTANT: Use ProductSchema here (a VALUE), not Product (a TYPE).
 */
export type UnifiedProduct = z.infer<typeof ProductSchema>;

/**
 * Search params accepted by providers. Keep liberal so callers can pass what they have.
 */
export type SearchParams = {
  query?: string;
  category?: string;
  gender?: "female" | "male" | "unisex";
  size?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  currency?: "EUR" | "USD";
  limit?: number;
};

/**
 * Provider search result envelope.
 */
export type ProviderResult = {
  provider: ProviderName;
  items: UnifiedProduct[];
};

/**
 * Provider contract each adapter implements.
 */
export interface Provider {
  name: ProviderName;
  enabled(): boolean;
  search(params: SearchParams): Promise<ProviderResult>;
}
