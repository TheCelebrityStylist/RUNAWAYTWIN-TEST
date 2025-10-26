import type { Metadata } from 'next';

type Post = { slug: string; title: string; date: string; body: string };
const POSTS: Post[] = [
  { slug:'capsule-wardrobe-2025', title:'Capsule Wardrobe 2025', date:'2025-08-01', body:`Build from versatile neutrals: a tailored blazer, trench, crisp shirt, knit tank, wide-leg trousers, dark denim, slip skirt, simple dress, white sneakers, leather loafers, ankle boots, and a structured bag.` },
  { slug:'color-season-guide', title:'Color Season Guide', date:'2025-07-20', body:`Identify your undertone and choose a palette that harmonizes with your skin, hair, and eye color. Winter: cool, bold contrast. Summer: cool, muted. Spring: warm, bright. Autumn: warm, rich.` },
  { slug:'elevate-office-style', title:'Elevate Office Style', date:'2025-06-11', body:`Polish comes from fit and proportion. Define the waist, ankle-showing trouser breaks, and clean footwear. Keep a consistent color story and add a single statement detail.` }
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = POSTS.find(x => x.slug === params.slug);
  return { title: p ? `${p.title} — RunwayTwin` : 'Post — RunwayTwin' };
}

export default function PostPage({ params }: { params: { slug: string } }){
  const p = POSTS.find(x => x.slug === params.slug);
  if(!p) return <div className="card" style={{padding:24}}><h1>Not found</h1></div>;
  return (
    <article className="card" style={{padding:24}}>
      <img src={`https://picsum.photos/seed/${p.slug}/1200/640`} alt="" />
      <h1 style={{fontSize:34, margin:'14px 0 6px 0'}}>{p.title}</h1>
      <div style={{opacity:.6, fontSize:13, marginBottom:16}}>{new Date(p.date).toLocaleDateString()}</div>
      <div className="prose" style={{fontSize:18, lineHeight:1.6, whiteSpace:'pre-wrap'}}>{p.body}</div>
      <hr className="div" />
      <a href="/blog" className="btn btn-ghost">← Back to Blog</a>
    </article>
  );
}
