// lib/affiliates/mock.ts
import { ProductSchema, type Product } from "../schemas";

// If you already have Provider/SearchParams types in ./unified, keep them.
// Otherwise these minimal local types will satisfy the compiler:
export type SearchParams = {
  query?: string;
  currency?: "EUR" | "USD";
  limit?: number;
};

const MOCK_RAW = [
  {
    id: "mock-top-1",
    title: "Tailored Black Blazer",
    brand: "RunwayTwin",
    image: "https://picsum.photos/seed/blazer/600/800",
    price: 129,
    currency: "EUR" as const,
    rating: 4.5,
    sizes: ["S", "M", "L"],
    color: "black",
    availability: "in_stock" as const,
    url: "https://example.com/blazer",
    merchant: "MockMart",
  },
  {
    id: "mock-bottom-1",
    title: "High-Waisted Wide-Leg Trousers",
    brand: "RunwayTwin",
    image: "https://picsum.photos/seed/trousers/600/800",
    price: 89,
    currency: "EUR" as const,
    rating: 4.5,
    sizes: ["S", "M", "L"],
    color: "cream",
    availability: "in_stock" as const,
    url: "https://example.com/trousers",
    merchant: "MockMart",
  },
  {
    id: "mock-shoes-1",
    title: "Pointed-Toe Leather Pumps",
    brand: "RunwayTwin",
    image: "https://picsum.photos/seed/pumps/600/800",
    price: 110,
    currency: "EUR" as const,
    rating: 4.4,
    sizes: ["37", "38", "39"],
    color: "black",
    availability: "in_stock" as const,
    url: "https://example.com/pumps",
    merchant: "MockMart",
  },
];

/** Strongly-typed, schema-validated mock list */
export const MOCK: Product[] = MOCK_RAW.map((p) => ProductSchema.parse(p));

/** Simple mock search (respects currency & limit) */
export async function searchMock(params: SearchParams = {}): Promise<Product[]> {
  const cur = params.currency ?? "EUR";
  const lim = params.limit ?? 6;

  // clone + adjust currency if needed
  const list = MOCK.map((p, i) => ({
    ...p,
    id: `${p.id}-${i}`,
    currency: cur,
  }));

  return list.slice(0, lim);
}

