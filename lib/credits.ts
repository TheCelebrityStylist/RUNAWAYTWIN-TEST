import { createClient, SupabaseClient } from "@supabase/supabase-js";
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
const creditsPath = path.join(dataDir, "credits.json");
async function ensureLocal(){ await fs.mkdir(dataDir,{recursive:true}); try{await fs.access(creditsPath);}catch{await fs.writeFile(creditsPath, JSON.stringify({users:{}},null,2),'utf-8');} }
type LocalDB={users:Record<string,number>};
export async function getCredits(userId:string){ const sb=getSupabase(); if(sb){/* optional supabase */} await ensureLocal(); const raw=JSON.parse(await fs.readFile(creditsPath,'utf-8')) as LocalDB; return raw.users[userId]||0; }
export async function addCredits(userId:string, amount:number){ const sb=getSupabase(); if(sb){/* optional */} await ensureLocal(); const raw=JSON.parse(await fs.readFile(creditsPath,'utf-8')) as LocalDB; raw.users[userId]=(raw.users[userId]||0)+amount; await fs.writeFile(creditsPath, JSON.stringify(raw,null,2),'utf-8'); }
export async function consumeCredit(userId:string){ const cur=await getCredits(userId); if(cur<=0) return false; await addCredits(userId,-1); return true; }
