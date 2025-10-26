import { StyleBrief } from "@/lib/schemas"; import { OutfitsResponse } from "./schema";
export async function planOutfitsMock(brief: StyleBrief): Promise<OutfitsResponse>{
  const mk=(label:'Safe'|'Standout'|'Wildcard')=>({ id:`mock-${label.toLowerCase()}`, label, items:[
    {role:'top',product:{id:'t1',title:'Tailored Black Blazer',brand:'RunwayTwin',image:`https://picsum.photos/seed/${label}b/600/800`,price:129,currency:brief.currency,rating:4.5,sizes:['S','M','L'],color:'black',availability:'in_stock',url:'https://example.com/blazer',merchant:'MockMart'}},
    {role:'bottom',product:{id:'b1',title:'High-Waisted Wide-Leg Trousers',brand:'RunwayTwin',image:`https://picsum.photos/seed/${label}t/600/800`,price:89,currency:brief.currency,rating:4.4,sizes:['S','M','L'],color:'cream',availability:'in_stock',url:'https://example.com/trousers',merchant:'MockMart'}},
    {role:'shoes',product:{id:'s1',title:'Pointed-Toe Leather Pumps',brand:'RunwayTwin',image:`https://picsum.photos/seed/${label}s/600/800`,price:110,currency:brief.currency,rating:4.7,sizes:['37','38','39'],color:'black',availability:'in_stock',url:'https://example.com/pumps',merchant:'MockMart'}},
    {role:'bag',product:{id:'g1',title:'Structured Crossbody Bag',brand:'RunwayTwin',image:`https://picsum.photos/seed/${label}g/600/800`,price:75,currency:brief.currency,rating:4.3,sizes:[],color:'tan',availability:'in_stock',url:'https://example.com/bag',merchant:'MockMart'}},
    {role:'outerwear',product:{id:'o1',title:'Lightweight Trench Coat',brand:'RunwayTwin',image:`https://picsum.photos/seed/${label}o/600/800`,price:140,currency:brief.currency,rating:4.5,sizes:['S','M','L'],color:'beige',availability:'limited',url:'https://example.com/trench',merchant:'MockMart'}},
    {role:'accessory',product:{id:'a1',title:'Minimalist Gold Hoops',brand:'RunwayTwin',image:`https://picsum.photos/seed/${label}a/600/800`,price:25,currency:brief.currency,rating:4.8,sizes:[],color:'gold',availability:'in_stock',url:'https://example.com/hoops',merchant:'MockMart'}}
  ], why:['Balances proportions.','Neutral palette + accent.','Works for your occasion.'] });
  return { outfits: [mk('Safe'), mk('Standout'), mk('Wildcard')] };
}
export async function planOutfits(brief: StyleBrief){ if(!process.env.OPENAI_API_KEY) return planOutfitsMock(brief); return planOutfitsMock(brief); }
