import {z} from "zod";

const passwordValidation = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

export const LoginSchema = z.object({
  email: z.string().email({
  message: "Invalid email address or password",
}),
  password: z.string().min(8,{
    message: "password must be min. 8 characters long"
  }).regex(passwordValidation, {
    message: "password must include one number, one special character, one uppercase"
  }),
});