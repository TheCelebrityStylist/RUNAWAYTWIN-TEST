import { NextRequest, NextResponse } from "next/server";
import { rankProducts } from "@/lib/affiliates/unified";
import { MockProvider } from "@/lib/affiliates/mock";
import { AmazonProvider } from "@/lib/affiliates/amazon";
import { AwinProvider } from "@/lib/affiliates/awin";
import { RakutenProvider } from "@/lib/affiliates/rakuten";
import { mapQueryToCategory } from "@/lib/catalogMap";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = String(body.query || "blazer");
    const category = mapQueryToCategory(query);
    const params = { ...body, query, category };
    const providers = [ new AmazonProvider(), new AwinProvider(), new RakutenProvider(), new MockProvider() ];
    const results = await Promise.all(providers.map(p => p.search(params)));
    let all = results.flatMap(r => r.items);
    if (Array.isArray(body.palette) && body.palette.length){ all = all.filter(p => body.palette.some((c:string)=> (p.color||'').toLowerCase().includes(c.toLowerCase()))); }
    const ranked = rankProducts(all, query);
    return NextResponse.json({ ok: true, data: ranked });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
