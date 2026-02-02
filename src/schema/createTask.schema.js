import {z} from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(3,{
    message:"Task Title must be atleast 3 letters long"
  }),

  description: z.string().max(500,{
    message:"Task Description must be atmost 500 letters long"
  }),
    
  status: z.enum(["todo", "inProgress", "completed"]),
  priority: z.enum(["high","low","normal"]), 
  dueDate: z.date({required_error:"Task due date is required"}),
});