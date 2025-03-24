import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus as updateTaskStatusApi } from "../services/tasksApis";
import toast from "react-hot-toast";
import { TASK_FIELDS } from "../enum/task";

export const useUpdateTaskStatus = () => {

  const queryClient = useQueryClient();

  const { mutate: updateTaskStatus, isPending: isUpdatingTaskStatus } = useMutation({
    mutationFn: ({ taskId, newStatus }: { taskId: string, newStatus: { [TASK_FIELDS.STATUS]: string } }) => updateTaskStatusApi(taskId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
      return false;
    },
  });

  return { updateTaskStatus, isUpdatingTaskStatus };
}