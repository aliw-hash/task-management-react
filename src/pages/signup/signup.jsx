import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupSchema } from "@/schema/signup.schema";
import { useSignup } from "@/hook/useSignup.hook";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

function LoginRedirect(){
  return (
    <Button variant="secondary" asChild>
      <Link to="/">Login Here</Link>
    </Button>
  );
}

export default function Signup() {
  const { mutate, isPending, isError, isSuccess } = useSignup();

  const form = useForm({
    resolver: zodResolver(SignupSchema),
  });

  function onSubmit(values){
    console.log(values);
    mutate(values);
    form.reset();
  }

  useEffect(()=>{
    if(isSuccess){
      toast("User Created Successfully", { 
        position: "bottom-right",
        description: "you can now login and start creating tasks",
        action: <LoginRedirect/>
      });
    }
  }, [isSuccess]);

  useEffect(()=>{
    if(isError){
      toast("Uh-Oh error occur while creating your account", { 
        position: "bottom-right",
        description: "Possibly a user with same email already exist",
        variant: "destructive"
      });
    }
  }, [isError]);

  return (
    <section className="flex flex-row max-w-screen-xl min-h-screen w-full justify-center items-center">
      <div className="w-4/12">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Create a new account to start creating tasks
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField 
                  control= {form.control}
                  name= "firstName"
                  render= {({field, fieldState})=>(
                    <FormItem className="mb-1">
                      <FormControl>
                        <Input 
                          placeholder="First Name" 
                          {...field}
                          className={fieldState.error ? "border-red-500 focus-visible:ring-red-500" : ""}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <div className="min-h-[16px] leading-none">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField 
                  control= {form.control}
                  name= "lastName"
                  render= {({field})=>(
                    <FormItem className="mb-1">
                      <FormControl>
                        <Input 
                          placeholder="Last Name" 
                          {...field} 
                          value={field.value ?? ""}/>
                      </FormControl>
                      <div className="min-h-[16px] leading-none">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField 
                  control= {form.control}
                  name= "email"
                  render= {({field})=>(
                    <FormItem className="mb-1">
                      <FormControl>
                        <Input 
                          placeholder="Email" 
                          {...field} 
                          value={field.value ?? ""}/>
                      </FormControl>
                      <div className="min-h-[16px] leading-none">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField 
                  control= {form.control}
                  name= "password"
                  render= {({field})=>(
                    <FormItem className="mb-1">
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="password" 
                          {...field} 
                          value={field.value ?? ""}/>
                      </FormControl>
                      <div className="min-h-[32px] leading-none">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

              </CardContent>
              <CardFooter className="flex flex-row justify-between">
                <p className="basis-1/2">
                  Already have an account?{" "}
                  <Link className="text-blue-500 hover:text-blue-700" to="/">
                    Login Here
                  </Link>
                </p>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Spinner className="mr-2 h-4 w-4" />}
                  {isPending ? "Signing Up..." : "Signup"}
                </Button>
              </CardFooter>
            </form>
          </Form>

        </Card>
      </div>
      <Toaster />
    </section>
  );
}

