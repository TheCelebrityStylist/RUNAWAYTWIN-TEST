import { z } from 'zod'; import { Outfit } from '@/lib/schemas'; export const OutfitsResponse=z.object({outfits:z.array(Outfit)}); export type OutfitsResponse = z.infer<typeof OutfitsResponse>;
