import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function Logout(){
  const navigate = useNavigate();

  function handleClick(){
    Cookies.remove("token");
    navigate("/");
  }

  return (
    <div className="flex justify-end">
      <Button onClick={handleClick} size="icon-sm" aria-label="Submit" variant="outline">
        <LogOutIcon className="h-4 w-4"/>
      </Button>
    </div>
  );
}