export default function Page(){
  return (
    <div style={{display:'grid', gap: '36px'}}>
      <section className="card shadow-soft" style={{padding:'36px', display:'grid', gridTemplateColumns:'1.2fr .8fr', gap:'24px'}}>
        <div>
          <span style={{display:'inline-block', padding:'6px 10px', border:'1px solid var(--border)', borderRadius:12, fontSize:12, color:'var(--muted)'}}>NEW · RunwayTwin Pro</span>
          <h1 style={{fontSize:44, lineHeight:1.05, margin:'16px 0 10px'}}>The Ultimate <span style={{color:'var(--brand)'}}>AI Stylist</span> + Affiliate Engine</h1>
          <p style={{opacity:.88, fontSize:18, maxWidth:640}}>Get 3 curated looks per brief—Safe, Standout, and Wildcard—mapped to live products with prices, sizes, and affiliate-ready links. One free look, then credits or bundles.</p>
          <div style={{display:'flex', gap:12, marginTop:18}}>
            <a className="btn btn-primary focus-ring" href="/quiz">Start Free</a>
            <a className="btn btn-ghost focus-ring" href="/blog">Read the Guide</a>
          </div>
          <ul style={{marginTop:20, color:'#d1d1d6', fontSize:14, display:'grid', gap:6}}>
            <li>• Real products via Amazon/Awin/Rakuten (mock fallback for dev)</li>
            <li>• Geo‑aware affiliate wrapping & UTM tracking</li>
            <li>• Save to Wardrobe, export Lookbook PDF</li>
          </ul>
        </div>
        <div className="card" style={{overflow:'hidden', display:'grid', placeItems:'center'}}>
          <img alt="Preview" src="https://picsum.photos/seed/runway-hero/900/700" />
        </div>
      </section>

      <section style={{display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:16}}>
        {['Instant Quiz','Outfit Generator','Live Product Search'].map((t,i)=>(
          <div key={i} className="card" style={{padding:'20px'}}>
            <h3 style={{margin:'8px 0', fontSize:20}}>{t}</h3>
            <p style={{color:'#d1d1d6'}}>Answer a few questions, get 3 looks with sizing, palette, and proportion notes—plus shoppable items.</p>
          </div>
        ))}
      </section>

      <section className="card" style={{padding:'24px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
          <h2 style={{fontSize:26}}>From the Blog</h2>
          <a href="/blog" className="btn btn-ghost">View all</a>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:16}}>
          {[
            {slug:'capsule-wardrobe-2025', title:'Capsule Wardrobe 2025', excerpt:'The 12 essential pieces that unlock 50+ outfits.'},
            {slug:'color-season-guide', title:'Color Season Guide', excerpt:'How to find a palette that flatters you instantly.'},
            {slug:'elevate-office-style', title:'Elevate Office Style', excerpt:'Polished, comfortable, and budget-aware looks.'},
          ].map(p=> (
            <a key={p.slug} href={`/blog/${p.slug}`} className="card" style={{padding:'18px', display:'grid', gap:8}}>
              <img src={`https://picsum.photos/seed/${p.slug}/800/500`} alt="" />
              <div>
                <div style={{fontWeight:700}}>{p.title}</div>
                <div style={{color:'#b3b3ba', fontSize:14}}>{p.excerpt}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
