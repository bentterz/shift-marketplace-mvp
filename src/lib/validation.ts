import { z } from "zod";

export const ListingAIResponseSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  category: z.string(),
  subcategory: z.string().optional().nullable(),
  condition: z.enum(["New", "Like New", "Good", "Fair", "For Parts"]),
  price: z.number().int().nonnegative(), // pence
  currency: z.string().default("GBP"),
  location: z.string().optional().nullable(),
  attributes: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .default({}),
  photos: z.array(z.string().url()).default([])
});

export type ListingAIResponse = z.infer<typeof ListingAIResponseSchema>;

export const CreateListingSchema = ListingAIResponseSchema;
