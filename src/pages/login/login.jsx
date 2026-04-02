import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoginSchema } from "@/schema/login.schema";
import {useLogin} from "@/hook/useLogin.hook";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useRef } from "react";


export default function Login() {
  const {mutate, isPending, isError, isSuccess} = useLogin();
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const hasShown = useRef(false);

  const form = useForm({
      resolver: zodResolver(LoginSchema),
    });
  
    function onSubmit(values){
      mutate(values);
    }

    useEffect(()=>{
      if(isSuccess){
        form.reset();
        setLogin(true);
      }
    },[isSuccess]);

    useEffect(()=>{
      if(login){
        navigate("/tasks");
      }
    },[login]);

    useEffect(()=>{
      if(isError){
          toast("Uh-Oh error occur while logging in", { 
          position: "bottom-right",
          description: "Please check your login details",
          variant: "destructive"
        });
      }
    }, [isError]);

    useEffect(() => {
  if (location.state?.message && !hasShown.current) {
    toast.error(location.state.message, {
      position: "top-center",
    });
    hasShown.current = true;
  }
}, [location.state]);

  return (
    <section className="flex flex-row max-w-screen-xl min-h-screen w-full justify-center items-center">
      <div className="w-4/12">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login and create task
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField 
                  control= {form.control}
                  name= "email"
                  render= {({field, fieldState})=>(
                    <FormItem className="mb-1">
                      <FormControl>
                        <Input 
                          placeholder="email" 
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
                  name= "password"
                  render= {({field, fieldState})=>(
                    <FormItem className="mb-1">
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="password" 
                          {...field}
                          className={fieldState.error ? "border-red-500 focus-visible:ring-red-500" : ""}
                          value={field.value ?? ""}
                        />
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
                  Don't have an account?{" "}
                  <Link className="text-blue-500 hover:text-blue-700" to="/signup">
                    Signup Here
                  </Link>
                </p>

                <Button type="submit" disabled={isPending}>
                  {isPending && <Spinner className="mr-2 h-4 w-4" />}
                  {isPending ? "Signing in..." : "Login"}
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