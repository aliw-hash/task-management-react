import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {Button} from "@/components/ui/button";
import { Textarea } from "../ui/textarea";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateTaskSchema } from "@/schema/createTask.schema.js";
import { useCreateTask } from "@/hook/useCreateTask.hook";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function CreateTaskForm(){
  const queryClient = useQueryClient();
  const [date, setDate] = useState();
  const {isPending, isError, isSuccess, mutate} = useCreateTask();

  const form = useForm({
    resolver: zodResolver(CreateTaskSchema),
  });

  function onSubmit(values){
    let dueDate = values.dueDate.toISOString();
    mutate({...values, dueDate});
    form.reset();
  }

  useEffect(()=>{
    if(isSuccess){
      toast("task created successfully", { 
        position: "bottom-right",
        });
      }
  }, [isSuccess]);

  useEffect(()=>{
    if(isError){
      toast("Uh-Oh error occur while logging in", { 
        position: "bottom-right",
        description: "Please Try again",
        variant: "destructive"
        });
      }
  }, [isError]);

  return(
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col w-full gap-4"
        >
        <h1 className="font-semibold text-lg">Create a new task</h1>

        <FormField 
          control= {form.control}
          name= "title"
          render= {({field, fieldState})=>(
            <FormItem>
              <FormControl>
                <Input 
                  placeholder="task title" 
                  {...field}
                  className={fieldState.error ? "border-red-500 focus-visible:ring-red-500" : ""}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-2 w-full">

          <FormField 
            control= {form.control}
            name= "status"
            render= {({field, fieldState})=>(
              <FormItem className="basis-1/2">
                <Select 
                  onValueChange={field.onChange}
                  value = {field.value || ""}
                  >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="inProgress">In Progress</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                  
                <FormMessage />
              </FormItem>
            )}
          />
        
          <FormField 
            control= {form.control}
            name= "priority"
            render= {({field, fieldState})=>(
              <FormItem className="basis-1/2">
                <Select 
                  onValueChange= {field.onChange}
                  value = {field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                  <FormMessage />
                
              </FormItem>
            )}
          />
        </div>
            
        {/* here is date picker */}
        <FormField 
          control= {form.control}
          name= "dueDate"
          render= {({field, fieldState})=>(
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                        variant="outline"
                        data-empty={!date}
                        className="data-[empty=true]:text-muted-foreground w-full    justify-start text-left font-normal"
                      >
                        <CalendarIcon />
                        {field.value ? 
                          format(field.value, "PPP") : 
                          <span>Due Date</span>}
                      </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar 
                    mode="single" 
                    selected={field.value} 
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()} 
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* date picker ends */}
          
        <FormField 
          control= {form.control}
          name= "description"
          render= {({field, fieldState})=>(
            <FormItem>
              <FormControl>
              <Textarea 
                placeholder="Elaborate title here.." 
                {...field}             
                className="min-h-20"
                value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          
          <div className="flex justify-end">
            <Button type="submit" className="basis-2/7">Create Task</Button>
          </div>
      </form>
      < Toaster />
    </Form>
  );
}