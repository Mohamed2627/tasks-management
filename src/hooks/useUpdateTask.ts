import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITask } from "../models/task";
import { updateTask as updateTaskApi } from "../services/tasksApis";
import toast from "react-hot-toast";

export const useUpdateTask = () => {

  const queryClient = useQueryClient();

  const { mutate: updateTask, isPending: isUpdatingTask } = useMutation({
    mutationFn: (task: ITask) => updateTaskApi(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task-details"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
      return false;
    },
  });

  return { updateTask, isUpdatingTask };
}