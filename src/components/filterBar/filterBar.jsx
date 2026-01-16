import TaskPagination from "../taskPagination/taskPagination";

export default function FilterBar (){
  return (
    <nav className="flex justify-between">
      <TaskPagination />
      <p>order</p>
    </nav>
  );
}