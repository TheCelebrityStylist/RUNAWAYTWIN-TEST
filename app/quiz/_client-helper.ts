export async function postJSON<T>(url: string, payload: unknown): Promise<{ ok: boolean; data?: T; error?: string }>{ 
  const res = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
  const text = await res.text();
  let json: any = null;
  try{ json = text ? JSON.parse(text) : null; }catch{ json = null; }
  if(!res.ok){
    return { ok:false, error: json?.error || `HTTP ${res.status}` };
  }
  return { ok:true, data: json as T };
}
