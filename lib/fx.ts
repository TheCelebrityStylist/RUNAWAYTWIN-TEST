const R={EUR:1.0,USD:1.08}; export function convert(a:number, f:'EUR'|'USD', t:'EUR'|'USD'){ if(f===t) return a; const eur = f==='EUR'?a: a/R.USD; return t==='EUR'? eur: eur*R.USD; }
