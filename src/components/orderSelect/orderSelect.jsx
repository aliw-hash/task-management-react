import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "@/context/tasks.context.jsx";
import { extractQueryString } from "@/lib/extractQueryString.js";
import { useNavigate } from "react-router-dom";

export function OrderSelect() {
  const { tasks, setTasks } = useContext(TasksContext);
  const [currentOrder, setCurrentOrder] = useState();
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  let order = tasks?.pagination?.links?.next
    ? extractQueryString(tasks.pagination.links.next).get("order")
    : undefined;
  console.log(order);

  useEffect(() => {
    if (tasks?.pagination?.links?.current) {
      let currentPage = extractQueryString(tasks.pagination.links.current);
      let query = currentPage
        ? `/tasks?limit=${currentPage.get("limit")}&page=${currentPage.get(
            "page"
          )}`
        : undefined;
      setQuery(query);
    }
  }, [tasks]);

  useEffect(() => {
    if (currentOrder && query) {
      navigate(`${query}&order=${currentOrder}`);
    }
    if (currentOrder && !query) {
      navigate(`/tasks?order=${currentOrder}`);
    }
  }, [currentOrder]);

  return (
    <Select
      value={currentOrder ?? order}
      onValueChange={(value) => setCurrentOrder(value)}
      disabled = { tasks?.pagination?.meta?.totalItems === 0 }
      className = { tasks?.pagination?.meta?.totalItems === 0 ? "pointer-events-none opacity-50" : "" }
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select Order" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="asc">Asc</SelectItem>
          <SelectItem value="dsc">Dsc</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}