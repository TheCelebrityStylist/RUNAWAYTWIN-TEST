import { NextRequest, NextResponse } from "next/server";
import { StyleBriefSchema } from "@/lib/schemas";
import { planOutfits } from "@/lib/ai/planner";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const brief = StyleBriefSchema.parse({
      gender: String(body.gender || ""),
      sizes: Array.isArray(body.sizes) ? body.sizes : (typeof body.sizes === "string" ? body.sizes.split(",").map((s:string)=>s.trim()).filter(Boolean) : []),
      colors: Array.isArray(body.colors) ? body.colors : (typeof body.colors === "string" ? body.colors.split(",").map((s:string)=>s.trim()).filter(Boolean) : []),
      budget: typeof body.budget === "number" ? body.budget : undefined,
      currency: body.currency === "USD" ? "USD" : "EUR",
      occasion: typeof body.occasion === "string" ? body.occasion : undefined,
      climate: typeof body.climate === "string" ? body.climate : undefined,
      vibe: typeof body.vibe === "string" ? body.vibe : undefined,
    });

    const data = await planOutfits(brief);
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    const message = err?.message || "Planner error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
