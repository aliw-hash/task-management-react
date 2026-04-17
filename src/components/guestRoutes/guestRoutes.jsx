// components/guestRoutes/GuestRoutes.jsx
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoutes = () => {
  const token = Cookies.get("token");
  if (token) {
    return <Navigate to="/tasks" replace />;
  }

  return <Outlet />;
};

export default GuestRoutes;