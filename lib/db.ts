import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
let supabase: SupabaseClient | null = null;
function getSupabase(): SupabaseClient | null {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    if (!supabase) supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    return supabase;
  }
  return null;
}
const fs = await import("node:fs/promises");
const path = await import("node:path");
const dataDir = path.resolve(process.cwd(), ".data");
const localPath = path.join(dataDir, "local.json");
async function ensureLocal(){ await fs.mkdir(dataDir,{recursive:true}); try{await fs.access(localPath);}catch{await fs.writeFile(localPath, JSON.stringify({ savedSets: [] }, null, 2),'utf-8');} }
type LocalDB={ savedSets: any[] };
export async function saveSet(userId: string, payload: unknown){
  const sb=getSupabase(); if(sb){/* optional */}
  await ensureLocal(); const raw = JSON.parse(await fs.readFile(localPath,'utf-8')) as LocalDB;
  const saved = { id:nanoid(), userId, createdAt:new Date().toISOString(), ...payload }; raw.savedSets.push(saved);
  await fs.writeFile(localPath, JSON.stringify(raw,null,2),'utf-8'); return saved;
}
export async function listSets(userId: string){
  const sb=getSupabase(); if(sb){/* optional */}
  await ensureLocal(); const raw = JSON.parse(await fs.readFile(localPath,'utf-8')) as LocalDB;
  return raw.savedSets.filter((s:any)=>s.userId===userId);
}
