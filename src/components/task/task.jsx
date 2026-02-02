import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useUpdateTask } from "@/hook/useUpdateTask";
import { useQueryClient } from "@tanstack/react-query";

export default function Task (props){
  const {mutate, isSuccess} = useUpdateTask();
  const [progress, setProgress] = useState(false);
  const queryClient = useQueryClient();

  const {
    title="This is a default title",
    description ="This is a default description",
    status="todo",
    priority="normal",
    dueDate= new Date("2025-01-01T12:00:00.000Z"),
    id,
  } = props;
  
  let formattedDate = dueDate.toLocaleDateString("en-GB",{
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(()=>{
    if(status === "inProgress"){
      setProgress(true);
    }
  }, [status]);

  function handleProgressStatus(value){
    setProgress(value);
    mutate({ _id: id, status: value? "inProgress" : "todo" });
    queryClient.invalidateQueries({
      queryKey: ["fetchTasks"],
      refetchType: "all",
    });
  }

  function handleTaskCompleted(value){
    mutate({ _id: id, status: "completed" });
    queryClient.invalidateQueries({
      queryKey: ["fetchTasks"],
      refetchType: "all",
    });
  }

  return(
    <Card className="w-full mb-8">
      <CardHeader className="flex flex-row justify-between items-center pb-3">
          <CardTitle className="text-bold text-xl basis-2/3 leading-8">
            {title}
          </CardTitle>
          <div>
            <Badge className="mr-2 rounded-full" variant="outline">
              {formattedDate}
            </Badge>

            {priority==="normal" && (<Badge className="bg-sky-800 rounded-full" variant="outline">
              {priority}
            </Badge>
            )}
            {priority==="high" && (<Badge className="bg-red-800 rounded-full" variant="outline">
              {priority}
            </Badge>
            )}
            {priority==="low" && (<Badge className="bg-green-800 rounded-full" variant="outline">
              {priority}
            </Badge>
            )}
            
          </div>
      </CardHeader>
      <CardContent className="pb-3">
        <CardDescription>
          {description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="flex justify-between pb-3">
        <div className="flex items-center">
          <Switch 
            checked= {progress}
            onCheckedChange= {handleProgressStatus}
            id= "in-progress"
            />
          <Label className="ml-4" htmlFor="in-progress">In Progress</Label>
        </div>
        <Button
          onClick={handleTaskCompleted}
        >Completed</Button>
      </CardFooter>
    </Card>
  );
}