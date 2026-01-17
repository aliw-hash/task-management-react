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

export default function task (props){
  const {
    title="This is a default title",
    description ="This is a default description",
    status="todo",
    priority="normal",
    dueDate= new Date("2025-01-01T12:00:00.000Z"),
  } = props;
  
  let formattedDate = dueDate.toLocaleDateString("en-GB",{
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return(
    
    <Card className="w-full mb-8">
      <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-bold text-2xl basis-2/3 leading-8">
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
      <CardContent>
        <CardDescription>
          {description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <Switch 
            id="inProgress"
            checked={status === "inProgress"? true : false}
            onCheckedChange={()=>{console.log("switch changed")}}
            />
          <Label className="ml-4" htmlFor="inProgress">In Progress</Label>
        </div>
        <Button>{status}</Button>
      </CardFooter>
    </Card>
    
  );
}




// export default function task (){
//   return(
//     <section className="mt-8">
//       <Card className="flex flex-col justify-between">
//         <CardHeader className="flex justify-between">
//           <div>
//             <CardTitle className="w-1/3">demo title</CardTitle>
//           </div>
//           <div className="flex gap-x-2">
//             <Badge>demo-1/02/25</Badge>
//             <Badge>demo-st</Badge>
//           </div>
//         </CardHeader>
//         <CardDescription>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra a nulla a porta.
//         </CardDescription>
//         <CardFooter className="flex justify-between ">
//           <Switch className="" />
//           <Badge className="p-3 rounded-lg min-w-28">demo-badge</Badge>
//         </CardFooter>
//       </Card>
//     </section>
//   );
// }

