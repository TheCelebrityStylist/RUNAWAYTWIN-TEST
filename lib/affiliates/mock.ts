import { Provider, ProviderResult, SearchParams } from "./unified";
import { Product } from "../schemas";
const MOCK: Array<ReturnType<typeof Product.parse>> = [
  { id:"mock-top-1", title:"Tailored Black Blazer", brand:"RunwayTwin", image:"https://picsum.photos/seed/blazer/600/800", price:129, currency:"EUR", rating:4.6, sizes:["XS","S","M","L","XL"], color:"black", availability:"in_stock", url:"https://example.com/blazer", merchant:"MockMart" },
  { id:"mock-bottom-1", title:"High-Waisted Wide-Leg Trousers", brand:"RunwayTwin", image:"https://picsum.photos/seed/trousers/600/800", price:89, currency:"EUR", rating:4.4, sizes:["XS","S","M","L","XL"], color:"cream", availability:"in_stock", url:"https://example.com/trousers", merchant:"MockMart" },
  { id:"mock-shoes-1", title:"Pointed-Toe Leather Pumps", brand:"RunwayTwin", image:"https://picsum.photos/seed/pumps/600/800", price:110, currency:"EUR", rating:4.7, sizes:["37","38","39","40"], color:"black", availability:"in_stock", url:"https://example.com/pumps", merchant:"MockMart" },
  { id:"mock-bag-1", title:"Structured Crossbody Bag", brand:"RunwayTwin", image:"https://picsum.photos/seed/bag/600/800", price:75, currency:"EUR", rating:4.3, sizes:[], color:"tan", availability:"in_stock", url:"https://example.com/bag", merchant:"MockMart" },
  { id:"mock-outer-1", title:"Lightweight Trench Coat", brand:"RunwayTwin", image:"https://picsum.photos/seed/trench/600/800", price:140, currency:"EUR", rating:4.5, sizes:["XS","S","M","L","XL"], color:"beige", availability:"limited", url:"https://example.com/trench", merchant:"MockMart" },
  { id:"mock-accessory-1", title:"Minimalist Gold Hoops", brand:"RunwayTwin", image:"https://picsum.photos/seed/hoops/600/800", price:25, currency:"EUR", rating:4.8, sizes:[], color:"gold", availability:"in_stock", url:"https://example.com/hoops", merchant:"MockMart" }
];
export class MockProvider implements Provider {
  name = "amazon" as const;
  enabled(){ return true; }
  async search(params: SearchParams): Promise<ProviderResult> {
    let items = MOCK;
    if (params.color) items = items.filter(p => (p.color||'').toLowerCase().includes(params.color!.toLowerCase()));
    if (params.priceMin) items = items.filter(p => p.price >= params.priceMin!);
    if (params.priceMax) items = items.filter(p => p.price <= params.priceMax!);
    return { provider: this.name, items };
  }
}
