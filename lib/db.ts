import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import type { StyleBrief, Outfit } from "@/lib/schemas";

// Optional Supabase client (we still default to local JSON storage so the app runs without creds)
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

async function ensureLocal() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(localPath);
  } catch {
    const seed: LocalDB = { savedSets: [] };
    await fs.writeFile(localPath, JSON.stringify(seed, null, 2), "utf-8");
  }
}

type LocalSavedSet = {
  id: string;
  userId: string;
  createdAt: string;
  brief: StyleBrief | null;
  outfits: Outfit[];
};

type LocalDB = {
  savedSets: LocalSavedSet[];
};

/**
 * Save a set for a user.
 * Strictly typed payload to avoid spreading `unknown`.
 */
export async function saveSet(
  userId: string,
  payload: { brief?: StyleBrief | null; outfits?: Outfit[] }
): Promise<LocalSavedSet> {
  const sb = getSupabase();
  // If you wire a Supabase table later, you can upsert here and return its row.
  // For now we always persist locally so the app works without credentials.

  await ensureLocal();
  const raw = JSON.parse(await fs.readFile(localPath, "utf-8")) as LocalDB;

  const saved: LocalSavedSet = {
    id: nanoid(),
    userId,
    createdAt: new Date().toISOString(),
    brief: payload?.brief ?? null,
    outfits: payload?.outfits ?? [],
  };

  raw.savedSets.push(saved);
  await fs.writeFile(localPath, JSON.stringify(raw, null, 2), "utf-8");
  return saved;
}

export async function listSets(userId: string): Promise<LocalSavedSet[]> {
  const sb = getSupabase();
  // If using Supabase, query by userId and map to LocalSavedSet

  await ensureLocal();
  const raw = JSON.parse(await fs.readFile(localPath, "utf-8")) as LocalDB;
  return raw.savedSets.filter((s) => s.userId === userId);
}
