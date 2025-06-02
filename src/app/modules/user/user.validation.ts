import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: "Name is required",
      })
      .min(3, "Name must be at least 3 characters long"),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    shops: z.array(
      z.string({
        required_error: "Shop name is required",
      })
    ),
  }),
});


export { userValidationSchema };