import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITask } from "../models/task";
import { createTask as createTaskApi } from "../services/tasksApis";
import toast from "react-hot-toast";

export const useCreateTask = () => {

  const queryClient = useQueryClient();

  const { mutate: createTask, isPending: isCreatingTask } = useMutation({
    mutationFn: (task: ITask) => createTaskApi(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
      return false;
    },
  });

  return { createTask, isCreatingTask };
}