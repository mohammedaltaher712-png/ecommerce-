import * as z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "لا يمكن أن يكون فارغ" }),

    email: z
      .string()
      .min(1, { message: "لا يمكن أن يكون فارغ" })
      .email({ message: "يجب أن يكون بريد إلكتروني صحيح" }),

    password: z
      .string()
      .min(8, { message: "كلمة السر يجب أن تكون 8 أحرف على الأقل" }),

    password_confirmation: z
      .string()
      .min(8, { message: "لا يمكن أن يكون أقل من 8 أحرف" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمة السر غير متطابقة",
    path: ["password_confirmation"], // path of error
  });
export type TypeRegister = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "لا يمكن أن يكون فارغ" })
    .email({ message: "يجب أن يكون بريد إلكتروني صحيح" }),

  password: z
    .string()
    .min(8, { message: "كلمة السر يجب أن تكون 8 أحرف على الأقل" }),
});
export type TypeLogin = z.infer<typeof LoginSchema>;
