import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
  price: z.number().min(1, "Price is required.").max(65535),
  thumb: z.string().min(1, "Thumb is required.").max(65535),
});
