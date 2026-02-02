import { Card } from "../ui/card";
import styles from "./taskSidebar.module.css";
import {CreateTaskForm} from "../createTaskForm/createTaskForm.jsx";
import {UserProfile} from "../userProfile/userProfile.jsx";
import {Logout} from "../logout/logout";
import Cookies from "js-cookie";

export default function TaskSidebar (){
  const user = JSON.parse(Cookies.get("user"));
  console.log("user",user.firstName);
  return (
    <Card className={`h-full w-full p-4 ${styles.sidebarHeight} flex flex-col   justify-between`}
    >
      <UserProfile firstName= {user? user.firstName : ""} />
      <CreateTaskForm/>
      <Logout/>
    </Card>
  );
}

