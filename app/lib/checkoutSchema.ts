import { z } from "zod";

export const paymentDetailsSchema = z.object({
  cardNumber: z.string().min(16).max(19),
  cardholderName: z.string().min(3),
  expiryDate: z.string().min(5).max(5),
  cvv: z.string().min(3).max(4),
  billingAddress: z.string().min(5),
  city: z.string().min(2),
  zipCode: z.string().min(5),
  country: z.string().min(2),
});

export const checkoutStepSchema = z.object({
  step: z.enum(["plan", "payment", "confirmation", "success"]),
  planId: z.string().optional(),
  planType: z.enum(["FREE", "PRO", "PLUS"]).optional(),
  paymentDetails: paymentDetailsSchema.optional(),
});