import Login from "./pages/login/login.jsx";
import PageNotFound from "./pages/404/404.jsx";
import Signup from "./pages/signup/signup.jsx";
import Tasks from "./pages/tasks/task.jsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "tasks",
    element: <Tasks />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);