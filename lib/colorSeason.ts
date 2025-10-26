export type Season = "Winter" | "Summer" | "Spring" | "Autumn";
export function detectSeason(hexes: string[]): Season { if (hexes.some(h => h.toLowerCase().includes("de7600"))) return "Autumn"; return "Winter"; }
export function seasonPalette(season: Season): string[] {
  const map: Record<Season, string[]> = {
    Winter: ["#000000","#FFFFFF","#434D70","#104556"],
    Summer: ["#F5F5F5","#C0D6DF","#6B7F82","#2B3A67"],
    Spring: ["#FFF5E6","#F6D6AD","#B6E388","#5A9367"],
    Autumn: ["#2F1B12","#B08968","#E1C699","#6F4518"],
  };
  return map[season];
}
