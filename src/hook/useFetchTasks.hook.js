import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const fetchTasks = async ({ queryKey })=>{
  const [_key, { order="asc", limit=5, page=1 }] = queryKey;
  const token = Cookies.get("token");
  
  console.log("1vite URL: ",import.meta.env.VITE_API_URL);
  const base = window.location.origin;
  const url = new URL(`/api/tasks`, base);
  console.log("2vite URL: ",import.meta.env.VITE_API_URL);
  console.log("new URL: ",url);
  url.searchParams.append("order", order);
  url.searchParams.append("limit", limit);
  url.searchParams.append("page", page);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if(!response.ok){
    throw new Error("Network issue while getting tasks");
  }
  return await response.json();
}

export function useFetchTasks(params={}){
  return useQuery({
    queryKey:["fetchTasks", params],
    queryFn: fetchTasks,
    onSuccess: (response)=>{
      console.log("tasks fetched successfully");
    },
    onError: (error)=>{
      console.log("Error fetching tasks");
    },
  })
}