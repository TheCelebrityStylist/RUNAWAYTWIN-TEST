'use client';
import { useEffect, useState } from "react";
export default function WardrobePage(){ const [sets,setSets]=useState<any[]>([]);
  useEffect(()=>{(async()=>{ const res=await fetch('/api/mock/sets',{cache:'no-store'}).then(r=>r.json()); setSets(res?.data||[]); })();},[]);
  return(<div><h1 className="text-3xl font-semibold mb-6">Wardrobe</h1>{sets.length===0 && <p className="opacity-70">No saved sets yet. Generate outfits and save them.</p>}<div className="grid md:grid-cols-2 gap-6">{sets.map(s=>(<div key={s.id} className="bg-white p-4 rounded-xl shadow-soft"><div className="flex items-center justify-between mb-2"><div className="font-semibold">Saved on {new Date(s.createdAt).toLocaleString()}</div><span className="text-xs px-2 py-1 rounded-lg bg-brand/10">Saved</span></div><div className="text-sm opacity-80 mb-2">{s.brief?.occasion?.join(', ')}</div><div className="grid grid-cols-3 gap-2">{(s.outfits?.[0]?.items||[]).slice(0,3).map((it:any,idx:number)=>(<img key={idx} src={it.product.image} alt='' className='w-full h-24 object-cover rounded-lg'/>))}</div></div>))}</div></div>);
}
