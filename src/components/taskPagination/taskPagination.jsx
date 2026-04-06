import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.jsx"
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "@/context/tasks.context";
import { extractQueryString } from "@/lib/extractQueryString";

export function TaskPagination() {
  const {tasks, setTasks} = useContext(TasksContext);
  const [links, setLinks] = useState();
  const [meta, setMeta] = useState();
  
  const previousPage = links?.previous ? extractQueryString(links.previous).toString() : "#";
  const nextPage = links?.next ? extractQueryString(links.next).toString() : "#";
const order = links?.next
  ? extractQueryString(links.next).get("order")
  : links?.previous
    ? extractQueryString(links.previous).get("order")
    : null;

  const isLastPage = meta ? meta.currentPage === meta.totalPages : false;
  const isFirstPage = meta ? meta.currentPage === 1 : false;
  const haveTasks = meta? meta.totalItems > 0 : false;

  useEffect(()=>{
    if(tasks){
      setLinks( tasks.pagination.links );
      setMeta( tasks.pagination.meta );
    }
  },[ tasks ]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            to = { `/tasks?${previousPage}` }
            aria-disabled = { isFirstPage || !haveTasks }
            className = { isFirstPage || !haveTasks ? "pointer-events-none opacity-50" : "" }
          />
        </PaginationItem>
        { meta ? [...Array(meta.totalPages)].map((item, index)=>(
          <PaginationItem key={`page${index}`}>
            <PaginationLink
              to = { `/tasks?limit=${meta.itemsPerPage}&page=${
                    index + 1
                  }&order=${order}` }
              isActive = { index + 1 == meta.currentPage ? true : false }
            >
              { index + 1 }
            </PaginationLink>
          </PaginationItem>
        )) 
        : null }
        <PaginationItem>
          <PaginationNext 
            to = { `/tasks?${nextPage}` }
            aria-disabled = { isLastPage || !haveTasks }
            className = { isLastPage || !haveTasks ? "pointer-events-none opacity-50" : "" }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
