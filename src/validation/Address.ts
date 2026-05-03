import { z } from "zod";

export const addressSchema = z.object({
  city: z.string().min(1, "المدينة مطلوبة"),
  street: z.string().min(1, "الشارع مطلوب"),
  phone: z.string().min(8, "رقم الهاتف قصير").max(20, "رقم الهاتف طويل"),

  latitude: z.string().min(1, "يجب تحديد الموقع"),
  longitude: z.string().min(1, "يجب تحديد الموقع"),
});

export type AddressForm = z.infer<typeof addressSchema>;
