import { Link } from "react-router-dom";
import {Button} from "../../components/ui/button.jsx";

export default function Login() {
  return (
    <>
      <h1 class="text-xl">This is the Login Page</h1>
      <ul>
        <li>
          <Link to="tasks">Tasks</Link>
        </li>
        <li>
          <Button asChild>
            <Link to="signup">Signup</Link>
          </Button>
        </li>
      </ul>
    </>
  );
}