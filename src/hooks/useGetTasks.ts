import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/tasksApis";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";

export const useGetTasks = () => {

  const [searchParams, _] = useSearchParams();

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ["tasks", searchParams.toString()],
    queryFn: () => getTasks(searchParams.toString()),
    throwOnError: (error) => {
      toast.error(error.message);
      return false;
    }
  });

  return { tasks, isLoading, error };
}