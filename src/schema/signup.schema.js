import {z} from "zod";

const passwordValidation = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

export const SignupSchema = z.object({
  firstName: z.string().min(3,{
    message:"first name must be atleast 3 letters long"
  }),
  lastName: z.string().max(100,{
    message:"last name must be atmost 100 letters long"
  }).optional(),
  email: z.string().email({
  message: "Invalid email address",
}),
  password: z.string().min(8,{
    message: "password must be min. 8 characters long"
  }).regex(passwordValidation, {
    message: "password must include one number, one special character, one uppercase"
  }),
});

