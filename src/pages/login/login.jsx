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

export default function Login() {
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
          <CardContent>
            <Input className="mb-4" type="email" placeholder="Email" />
            <Input className="mb-4" type="password" placeholder="Password" />
          </CardContent>
          <CardFooter className="flex flex-row justify-between">
            <p className="basis-1/2">
              Don't have an account?{" "}
              <Link className="text-blue-500 hover:text-blue-700" to="/signup">
                Signup Here
              </Link>
            </p>
            <Button>Login</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}