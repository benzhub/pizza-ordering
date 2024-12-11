import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
  price: z.number().min(1, "Price is required.").max(65535),
  thumb: z.string().min(1, "Thumb is required.").max(65535),
});

export const phoneNumberRegex = /^09\d{8}$/;

export const orderSchema = z.object({
  customerName: z.string().min(3).max(255),
  customerPhone: z.string().regex(phoneNumberRegex), 
  customerAddress: z.string().min(5).max(255),
  cartItems: z.array(
    z.object({
      unitPrice: z.number().min(1).max(9999),
      productId: z.number().min(1).max(65535),
      quantity: z.number().min(1).max(999),
    })
  ),
});

export const patchUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});
