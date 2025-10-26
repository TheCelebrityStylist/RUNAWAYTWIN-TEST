import { z } from "zod"; import { Product } from "../schemas";
export type ProviderName = "amazon" | "rakuten" | "awin";
export type UnifiedProduct = z.infer<typeof Product>;
export type SearchParams = { query: string; category?: string; gender?: "female"|"male"|"unisex"; size?: string; color?: string; priceMin?: number; priceMax?: number; currency?: "EUR"|"USD"; region?: "EU"|"US"; };
export type ProviderResult = { provider: ProviderName; items: UnifiedProduct[] };
export interface Provider { name: ProviderName; enabled(): boolean; search(params: SearchParams): Promise<ProviderResult>; }
export function rankProducts(items: UnifiedProduct[], query: string): UnifiedProduct[] {
  const q=query.toLowerCase();
  return items.map(p=>{let s=0; if(p.title.toLowerCase().includes(q)) s+=2; if((p.brand||'').toLowerCase().includes(q)) s+=1; if(p.availability==='in_stock') s+=2; if((p.rating||0)>4.2) s+=1; return {p,s};})
    .sort((a,b)=>b.s-a.s).map(x=>x.p);
}
