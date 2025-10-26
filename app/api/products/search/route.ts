import { NextRequest, NextResponse } from "next/server";
import { ProductSchema } from "@/lib/schemas";

export const runtime = "edge";

export async function POST(req: NextRequest){
  try{
    const body = await req.json().catch(()=>({}));
    const q = String(body?.query || "blazer");
    const currency = body?.currency === "USD" ? "USD" : "EUR";
    const list = Array.from({length: 6}).map((_,i)=> ({
      id: `${q}-${i}`,
      title: `${q} ${i+1}`,
      brand: "MockBrand",
      image: `https://picsum.photos/seed/${encodeURIComponent(q+'-'+i)}/600/800`,
      price: 50 + i*10,
      currency,
      rating: 4.3,
      sizes: ["S","M","L"],
      color: "black",
      availability: "in_stock",
      url: "https://example.com/item",
      merchant: "MockMart"
    }));
    const safe = list.map(p => ProductSchema.parse(p));
    return NextResponse.json({ products: safe }, { status: 200 });
  }catch(e:any){
    return NextResponse.json({ error: e?.message || "Product search error" }, { status: 500 });
  }
}
