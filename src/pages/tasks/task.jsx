import TasksCounter from "@/components/tasksCounter/tasksCounter.jsx";
import FilterBar from "../../components/filterBar/filterBar.jsx";
import Task from "@/components/task/task";
import TaskSidebar from "@/components/taskSidebar/taskSidebar.jsx";
import { useFetchTasks } from "@/hook/useFetchTasks.hook.js";
import { useContext, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import { TasksContext } from "@/context/tasks.context.jsx";
import { useSearchParams } from "react-router-dom";

function SkeletonAvatar() {
  return (
    <div className="flex items-center mb-6">
      <Skeleton className="h-24 w-full rounded" />
    </div>
  );
}

function todaysDate(){
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-GB",options);
  return formattedDate;
}

export default function Tasks() {
  
  const {tasks, setTasks} = useContext(TasksContext);
  const [searchParams, setSearchParams] = useSearchParams();

  let queryLimit = searchParams.get("limit") ?? 5;
  let queryPage = searchParams.get("page") ?? 1;
  let queryOrder = searchParams.get("order") ?? 'asc';

  const {data, isError, isSuccess, isPending, error} = useFetchTasks({
    order: queryOrder,
    limit: queryLimit,
    page: queryPage,
  });
  console.log(data);

  useEffect(()=>{
    if(data){
      setTasks(data);
    }
  },[data]);
  
  return (
    <section className="flex flex-row w-full p-4 gap-40">
      <section className="flex basis-2/3 justify-center h-[80vh]">
        <div className="flex flex-col w-10/12 p-4 items-center">
          <h1 className="text-white font-bold text-2xl mb-8 w-full text-left pl-8">
            Tasks as on: {todaysDate()}
          </h1>
          <div className="w-11/12 flex flex-col">
            <div className="sticky top-0 left-0 p-4 z-20 bg-background">
              <div className="flex justify-between mb-14">
                <TasksCounter 
                  count={tasks?.pagination?.meta?.totalTodoTasks} 
                  type="todo"/>
                <TasksCounter 
                  count={tasks?.pagination?.meta?.            totalInProgressTasks} type="inProgress"/>
                <TasksCounter
                  count={tasks?.pagination?.meta?.totalCompletedTasks} type="completed"/>
              </div>
              <FilterBar />
            </div>
            {
              !data &&
                [...Array(queryLimit)].map((_entry, index)=>(
                  <SkeletonAvatar key={`${index}skel`}/>
                ))
            }

            {data && data.data.map((task)=>(
              <Task
                key={task._id}
                title={task.title}
                description = {task.description}
                priority = {task.priority}
                status= {task.status}
                dueDate= {new Date(task.dueDate)}
                id= {task._id}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="fixed right-4 top-4 flex justify-center basis-1/3">
        <TaskSidebar/>
      </section>
    </section>
  );
} 