import { z } from 'zod';

export const createPropertySchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  city: z.string().min(1, "City is required"),
  price: z.number().positive("Price must be positive"),
  surface: z.number().positive("Surface must be positive"),
  description: z.string().optional()
});

export const updatePropertySchema = createPropertySchema.partial();

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;