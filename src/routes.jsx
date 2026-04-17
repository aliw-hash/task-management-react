import Login from "./pages/login/login.jsx";
import PageNotFound from "./pages/404/404.jsx";
import Signup from "./pages/signup/signup.jsx";
import Tasks from "./pages/tasks/task.jsx";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./components/privateRoutes/privateRoutes.jsx";
import GuestRoutes from "./components/guestRoutes/guestRoutes.jsx";

export const router = createBrowserRouter([
  
  // ✅ Guest routes (login/signup)
  {
    element: <GuestRoutes />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },

  // ✅ Protected routes
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "tasks",
        element: <Tasks />,
      },
    ],
  },

  // ❌ 404
  {
    path: "*",
    element: <PageNotFound />,
  },
]);