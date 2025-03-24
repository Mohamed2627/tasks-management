import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getTaskDetails } from "../services/tasksApis";
import toast from "react-hot-toast";

export const useGetTaskDetails = () => {

  const { taskId } = useParams();

  const { data: taskDetails, isLoading, error } = useQuery({
    queryKey: ["task-details", taskId],
    queryFn: () => getTaskDetails(taskId as string),
    throwOnError: (error) => {
      toast.error(error.message);
      return false;
    },
    enabled: !!taskId
  });

  return { taskDetails, isLoading, error };
}