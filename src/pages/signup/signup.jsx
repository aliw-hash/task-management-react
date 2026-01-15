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

export default function Signup() {
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
          <CardContent>
            <Input className="mb-4" type="text" placeholder="First Name" />
            <Input className="mb-4" type="text" placeholder="Last Name" />
            <Input className="mb-4" type="email" placeholder="Email" />
            <Input className="mb-4" type="password" placeholder="Password" />
          </CardContent>
          <CardFooter className="flex flex-row justify-between">
            <p className="basis-1/2">
              Already have an account?{" "}
              <Link className="text-blue-500 hover:text-blue-700" to="/">
                Login Here
              </Link>
            </p>
            <Button>Signup</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}