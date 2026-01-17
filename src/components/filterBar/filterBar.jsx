import { TaskPagination } from "../taskPagination/taskPagination.jsx";
import { OrderSelect } from "../orderSelect/orderSelect.jsx";

export default function FilterBar (){
  return (
    <nav className="flex justify-between mb-8">
      <TaskPagination />
      <OrderSelect />
    </nav>
  );
}