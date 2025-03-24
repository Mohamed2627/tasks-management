import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITaskStatus } from "../models/task";
import { addNewTask } from "../services/tasksApis";
import toast from "react-hot-toast";

export const useCreateStatus = () => {

  const queryClient = useQueryClient();

  const { mutate: createStatus, isPending: isCreatingStatus } = useMutation({
    mutationFn: (status: ITaskStatus) => addNewTask(status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-status"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
      return false;
    },
  });

  return { createStatus, isCreatingStatus };
}