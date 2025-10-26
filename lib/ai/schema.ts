import { z } from "zod";
import {
  OutfitSchema,
  StyleBriefSchema,
  OutfitsResponseSchema,
  type Outfit,
  type StyleBrief,
  type OutfitsResponse,
} from "@/lib/schemas";

// Re-export the canonical schemas & types so other imports continue to work
export { OutfitSchema, StyleBriefSchema, OutfitsResponseSchema };
export type { Outfit, StyleBrief, OutfitsResponse };

// If any callers were importing default from here, keep a named export bundle:
export const Schemas = {
  OutfitSchema,
  StyleBriefSchema,
  OutfitsResponseSchema,
};
