import { StyleBrief, Outfit } from "@/lib/schemas";
import { OutfitsResponse } from "./schema";

/**
 * Helper literal types so TS understands our exact values.
 */
type Currency = "EUR" | "USD";
type Availability = "in_stock" | "oos" | "limited";

function prod(args: {
  id: string;
  title: string;
  imageSeed: string;
  price: number;
  currency: Currency;
  color: string;
  availability: Availability;
  sizes?: string[];
}) {
  const { id, title, imageSeed, price, currency, color, availability, sizes = [] } = args;
  return {
    id,
    title,
    brand: "RunwayTwin",
    image: `https://picsum.photos/seed/${encodeURIComponent(imageSeed)}/600/800`,
    price,
    currency, // strictly "EUR" | "USD"
    rating: 4.5,
    sizes,
    color,
    availability, // strictly "in_stock" | "oos" | "limited"
    url: "https://example.com/item",
    merchant: "MockMart",
  } as const;
}

export async function planOutfitsMock(brief: StyleBrief): Promise<OutfitsResponse> {
  const cur = brief.currency as Currency;

  const safe: Outfit = {
    id: "mock-safe",
    label: "Safe",
    items: [
      { role: "top", product: prod({ id: "t1", title: "Tailored Black Blazer", imageSeed: "safe-blazer", price: 129, currency: cur, color: "black", availability: "in_stock", sizes: ["S", "M", "L"] }) },
      { role: "bottom", product: prod({ id: "b1", title: "High-Waisted Wide-Leg Trousers", imageSeed: "safe-trousers", price: 89, currency: cur, color: "cream", availability: "in_stock", sizes: ["S", "M", "L"] }) },
      { role: "shoes", product: prod({ id: "s1", title: "Pointed-Toe Leather Pumps", imageSeed: "safe-pumps", price: 110, currency: cur, color: "black", availability: "in_stock", sizes: ["37", "38", "39"] }) },
      { role: "bag", product: prod({ id: "g1", title: "Structured Crossbody Bag", imageSeed: "safe-bag", price: 75, currency: cur, color: "tan", availability: "in_stock" }) },
      { role: "outerwear", product: prod({ id: "o1", title: "Lightweight Trench Coat", imageSeed: "safe-trench", price: 140, currency: cur, color: "beige", availability: "limited", sizes: ["S", "M", "L"] }) },
      { role: "accessory", product: prod({ id: "a1", title: "Minimalist Gold Hoops", imageSeed: "safe-hoops", price: 25, currency: cur, color: "gold", availability: "in_stock" }) },
    ],
    why: ["Balances proportions.", "Neutral palette + accent.", "Works for your occasion."],
  };

  const standout: Outfit = {
    id: "mock-standout",
    label: "Standout",
    items: [
      { role: "top", product: prod({ id: "t2", title: "Satin Wrap Blouse", imageSeed: "standout-blouse", price: 99, currency: cur, color: "emerald", availability: "in_stock", sizes: ["S", "M", "L"] }) },
      { role: "bottom", product: prod({ id: "b2", title: "Cigarette Trousers", imageSeed: "standout-cigarette", price: 95, currency: cur, color: "black", availability: "in_stock", sizes: ["S", "M", "L"] }) },
      { role: "shoes", product: prod({ id: "s2", title: "Ankle-Strap Heels", imageSeed: "standout-heels", price: 120, currency: cur, color: "black", availability: "in_stock", sizes: ["37", "38", "39", "40"] }) },
      { role: "bag", product: prod({ id: "g2", title: "Mini Top-Handle Bag", imageSeed: "standout-bag", price: 95, currency: cur, color: "emerald", availability: "in_stock" }) },
      { role: "outerwear", product: prod({ id: "o2", title: "Cropped Blazer", imageSeed: "standout-cropped", price: 130, currency: cur, color: "black", availability: "in_stock", sizes: ["S", "M", "L"] }) },
      { role: "accessory", product: prod({ id: "a2", title: "Statement Cuff", imageSeed: "standout-cuff", price: 39, currency: cur, color: "gold", availability: "in_stock" }) },
    ],
    why: ["Defined waist for polish.", "High-contrast focal color.", "Sharp lines fit the vibe."],
  };

  const wildcard: Outfit = {
    id: "mock-wildcard",
    label: "Wildcard",
    items: [
      { role: "top", product: prod({ id: "t3", title: "Relaxed Knit Tank", imageSeed: "wildcard-tank", price: 49, currency: cur, color: "ecru", availability: "in_stock", sizes: ["S", "M", "L"] }) },
      { role: "bottom", product: prod({ id: "b3", title: "Silky Slip Skirt", imageSeed: "wildcard-slip", price: 89, currency: cur, color: "charcoal", availability: "in_stock", sizes: ["S", "M", "L"] }) },
      { role: "shoes", product: prod({ id: "s3", title: "Chunky Loafers", imageSeed: "wildcard-loafers", price: 115, currency: cur, color: "black", availability: "in_stock", sizes: ["37", "38", "39", "40"] }) },
      { role: "bag", product: prod({ id: "g3", title: "Soft Hobo Bag", imageSeed: "wildcard-hobo", price: 85, currency: cur, color: "taupe", availability: "in_stock" }) },
      { role: "outerwear", product: prod({ id: "o3", title: "Oversized Denim Jacket", imageSeed: "wildcard-denim", price: 99, currency: cur, color: "midwash", availability: "in_stock", sizes: ["S", "M", "L"] }) },
      { role: "accessory", product: prod({ id: "a3", title: "Layered Necklaces", imageSeed: "wildcard-necklaces", price: 29, currency: cur, color: "gold", availability: "in_stock" }) },
    ],
    why: ["Relaxed proportions feel effortless.", "Soft neutrals with texture play.", "High-low mix keeps it fresh."],
  };

  return { outfits: [safe, standout, wildcard] };
}

export async function planOutfits(brief: StyleBrief): Promise<OutfitsResponse> {
  // If you add OpenAI later, call it here; mock for now.
  return planOutfitsMock(brief);
}
