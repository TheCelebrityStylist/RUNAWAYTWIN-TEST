import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const last = messages[messages.length-1]?.content || '';
    const reply = `Got it. Building looks for: "${last}". • Safe: blazer + wide-leg trousers. • Standout: wrap blouse + cigarette pants. • Wildcard: knit tank + slip skirt.`;
    return NextResponse.json({ ok:true, reply });
  }catch(e:any){
    return NextResponse.json({ ok:false, error: e?.message || 'Chat error' }, { status: 400 });
  }
}
