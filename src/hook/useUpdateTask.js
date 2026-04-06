import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

const updateTask = async (task)=>{
  const token = Cookies.get("token");
  
  const response = await fetch(`${import.meta.env.VITE_API_URL}tasks`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  if(!response.ok){
    throw new Error("Network issue while getting task");
  }
  return await response.json();
}

export function useUpdateTask(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: (response)=>{
      queryClient.invalidateQueries({
      queryKey: ["fetchTasks"],
      refetchType: "all",
    });
    },
    onError: (error)=>{
      console.log("Error updating tasks");
    },
  })
}