type Post = { slug: string; title: string; date: string; excerpt: string };
const POSTS: Post[] = [
  { slug:'capsule-wardrobe-2025', title:'Capsule Wardrobe 2025', date:'2025-08-01', excerpt:'The 12 essential pieces that unlock 50+ outfits.' },
  { slug:'color-season-guide', title:'Color Season Guide', date:'2025-07-20', excerpt:'Find a palette that flatters you instantly.' },
  { slug:'elevate-office-style', title:'Elevate Office Style', date:'2025-06-11', excerpt:'Polished, comfortable, and budget-aware looks.' }
];
export const metadata = { title: 'RunwayTwin Blog' };
export default function BlogIndex(){
  return (
    <div style={{display:'grid', gap:16}}>
      <h1 style={{fontSize:32, marginBottom:8}}>Blog</h1>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:16}}>
        {POSTS.map(p => (
          <a key={p.slug} href={`/blog/${p.slug}`} className="card" style={{padding:'18px', display:'grid', gap:8}}>
            <img src={`https://picsum.photos/seed/${p.slug}/800/500`} alt="" />
            <div>
              <div style={{opacity:.65, fontSize:12}}>{new Date(p.date).toLocaleDateString()}</div>
              <div style={{fontWeight:700, fontSize:18, marginTop:4}}>{p.title}</div>
              <div style={{color:'#b3b3ba', fontSize:14, marginTop:4}}>{p.excerpt}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
