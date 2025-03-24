import { useQuery } from "@tanstack/react-query";
import { getTaskStatus } from "../services/tasksApis";
import toast from "react-hot-toast";

export const useGetStatus = () => {

  const { data: taskStatus = [], isLoading, error } = useQuery({
    queryKey: ["task-status"],
    queryFn: () => getTaskStatus(),
    throwOnError: (error) => {
      toast.error(error.message);
      return false;
    }
  });

  return { taskStatus, isLoading, error };
}