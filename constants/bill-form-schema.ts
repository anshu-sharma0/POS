import * as z from "zod";

export const billingFormSchema = z.object({
  foodDiscountPercentage: z.string().min(0).max(100).nullable(),
  foodDiscountAmount: z.string().nullable(),
  barDiscountPercentage: z.string().min(0).max(100).nullable(),
  barDiscountAmount: z.string().nullable(),
  discountReason: z.string(),
  subTotal: z.string(),
  discount: z.string(),
  taxAmount: z.string(),
  serviceDiscount: z.string(),
  gstVat: z.number().nullable(),
  netAmount: z.string().nullable(),
  gst: z.string().nullable(),
  vat: z.string().nullable(),
});

export const billingFormDefaultValues = {
  foodDiscountPercentage: "",
  foodDiscountAmount: "",
  barDiscountPercentage: "",
  barDiscountAmount: "",
  discountReason: "",
  subTotal: "",
  discount: "",
  taxAmount: "",
  serviceDiscount: "",
  gstVat: "",
  gst: "",
  vat: "",
};
