import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
const COOKIE="rt_session"; const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET||"dev-secret");
export async function getOrCreateUserId(): Promise<string>{
  const jar=cookies(); const token=jar.get(COOKIE)?.value;
  if(token){ try{ const {payload}=await jwtVerify(token,secret); return String(payload.sub);}catch{} }
  const sub=`guest_${Math.random().toString(36).slice(2)}`;
  const jwt=await new SignJWT({}).setProtectedHeader({alg:"HS256"}).setSubject(sub).setIssuedAt().setExpirationTime("30d").sign(secret);
  jar.set(COOKIE, jwt, { httpOnly:true, path:"/", sameSite:"lax", maxAge:60*60*24*30 }); return sub;
}
export async function countLooks(): Promise<number>{ const v = cookies().get("rt_looks")?.value; return v? parseInt(v,10):0; }
export async function incLooks(){ const c=await countLooks(); cookies().set("rt_looks", String(c+1), { httpOnly:false, path:"/", sameSite:"lax", maxAge:60*60*24*30 }); }
