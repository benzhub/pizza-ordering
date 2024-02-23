import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
  price: z.number().min(1, "Price is required.").max(65535),
  thumb: z.string().min(1, "Thumb is required.").max(65535),
});

export const orderSchema = z.object({
  customerName: z.string(),
  customerPhone: z.string(), 
  customerAddress: z.string(),
  cartItems: z.array(
    z.object({
      unitPrice: z.number(),
      productId: z.number(),
      quantity: z.number().min(1),
    })
  ),
});

export const patchUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});
