import TasksCounter from "@/components/tasksCounter/taskCounter.jsx";

export default function Tasks() {
  return (
    <section className="flex flex-row gap-8 justify-between h-min w-full p-4">
      <section className="flex basis-2/3 justify-center">
        <div className="flex flex-col w-4/5 p-4">
          <h1 className="text-white font-bold text-2xl mb-8">
            Tasks as on: Wednesday, 1 Jan 2025
          </h1>
          <div className="flex justify-around">
            <TasksCounter count={4} type="todo"/>
            <TasksCounter count={10} type="inProgress"/>
            <TasksCounter count={9} type="completed"/>
          </div>
        </div>
      </section>
      <section className="flex basis-1/3 bg-red-700 justify-center">
        
      </section>
    </section>
  );
} 