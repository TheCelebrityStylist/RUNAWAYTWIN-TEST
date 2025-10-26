export function formatCurrency(a:number,c:'EUR'|'USD'='EUR'){return new Intl.NumberFormat(undefined,{style:'currency',currency:c}).format(a);}
