import * as z from "zod";

export const SelectedProductFormInfoSchema = z.object({
  name: z.string(),
  search: z.string(),
  mobileNo: z.string(),
  tableNo: z
    .string({
      required_error: "Table no is required",
    })
    .nonempty({
      message: "Table no is required",
    }),
  stewardNo: z
    .string({
      required_error: "stewardNo is required",
    })
    .nonempty({
      message: "Steward number is required",
    }),
  modifier: z.string().trim().optional(),
});
