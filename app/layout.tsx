import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'RunwayTwin — The Ultimate AI Stylist',
  description: 'Generate personal outfits with live products and affiliate links.',
  openGraph: { title: 'RunwayTwin', description: 'AI Stylist + Affiliate Engine', type: 'website' }
};

function NavLink({ href, label }: { href: string; label: string }){
  const path = typeof window === 'undefined' ? '' : window.location.pathname;
  const cn = path === href ? 'active' : '';
  return <a className={cn} href={href}>{label}</a>;
}

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="en">
      <body>
        <header style={{position:'sticky',top:0,backdropFilter:'blur(6px)',borderBottom:'1px solid var(--border)'}}>
          <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0'}}>
            <a href="/" style={{fontWeight:700,fontSize:20}}>RunwayTwin</a>
            <nav style={{display:'flex',gap:'16px',fontSize:14}}>
              <NavLink href="/quiz" label="Quiz" />
              <NavLink href="/blog" label="Blog" />
              <NavLink href="/chat" label="Chat" />
              <NavLink href="/pricing" label="Pricing" />
            </nav>
          </div>
        </header>
        <main className="container" style={{padding:'32px 0 64px 0'}}>{children}</main>
        <footer style={{borderTop:'1px solid var(--border)'}}>
          <div className="container" style={{padding:'20px 0', display:'flex', gap:'12px', justifyContent:'space-between', fontSize:13, color:'var(--muted)'}}>
            <span>© {new Date().getFullYear()} RunwayTwin — affiliate links may earn us a commission.</span>
            <span><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></span>
          </div>
        </footer>
      </body>
    </html>
  );
}
