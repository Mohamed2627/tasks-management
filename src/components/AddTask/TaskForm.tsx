import { useForm } from "react-hook-form"
import { ITask } from '../../models/task';
import { useParams } from 'react-router';
import { createTaskSchema, updateTaskSchema } from '../../validations/task';
import { ControlledInput } from '../Form/ControlledInput';
import { TASK_FIELDS } from '../../enum/task';
import CustomButton from '../Shared/CustomButton';
import { ControlledSelectInput } from '../Form/ControlledSelectInput';
import { TASKS_PRIORITY } from '../../constants';
import { v4 as uuidv4 } from 'uuid';
import { useGetTaskDetails } from '../../hooks/useGetTaskDetails';
import { useGetStatus } from '../../hooks/useGetStatus';
import { useCreateTask } from '../../hooks/useCreateTask';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { format } from "date-fns"
import { useUpdateTask } from '../../hooks/useUpdateTask';
import { useEffect } from "react";

const TaskForm = () => {

  // Hooks------------------------------------------
  const { taskId } = useParams();
  const { taskDetails } = useGetTaskDetails();
  const { taskStatus } = useGetStatus();
  const { createTask, isCreatingTask } = useCreateTask();
  const { updateTask, isUpdatingTask } = useUpdateTask()

  // React Hook Form--------------------------------
  const defaultValues = () => {
    if (taskId && taskDetails) {
      return {
        [TASK_FIELDS.ID]: taskDetails[TASK_FIELDS.ID],
        [TASK_FIELDS.TITLE]: taskDetails[TASK_FIELDS.TITLE],
        [TASK_FIELDS.DESCRIPTION]: taskDetails[TASK_FIELDS.DESCRIPTION],
        [TASK_FIELDS.PRIORITY]: taskDetails[TASK_FIELDS.PRIORITY],
        [TASK_FIELDS.STATUS]: taskDetails[TASK_FIELDS.STATUS],
        [TASK_FIELDS.DUE_DATE]: taskDetails[TASK_FIELDS.DUE_DATE]
      }
    }
    return {
      [TASK_FIELDS.ID]: uuidv4(),
      [TASK_FIELDS.TITLE]: "",
      [TASK_FIELDS.DESCRIPTION]: "",
      [TASK_FIELDS.PRIORITY]: "2",
      [TASK_FIELDS.STATUS]: "to-do",
      [TASK_FIELDS.DUE_DATE]: new Date()
    }
  }

  const form = useForm<ITask>({
    mode: "onBlur",
    resolver: taskId ? updateTaskSchema : createTaskSchema,
    defaultValues: defaultValues(),
  });

  const { reset, handleSubmit, watch, control } = form;

  //Functions--------------------------------------- 
  const onSubmit = (values: ITask) => {
    console.log(values);

    if (taskId) {
      updateTask(values, {
        onSuccess: () => {
          toast.success("Task updated successfully")
        }
      })
    } else {
      createTask(values, {
        onSuccess: () => {
          toast.success("Task created successfully");
          reset()
        }
      })
    }
  }

  // Effects----------------------------------------
  useEffect(() => {
    if (taskId && taskDetails) {
      reset({ ...defaultValues() });
    }
  }, [taskId, reset, taskDetails])

  return (
    <div
      className='w-full max-w-[500px] flex flex-col items-start justify-center gap-y-6'
    >
      <ControlledInput
        control={control}
        name={TASK_FIELDS.TITLE}
        id={TASK_FIELDS.TITLE}
        label="Title"
      />
      <ControlledInput
        control={control}
        name={TASK_FIELDS.DESCRIPTION}
        id={TASK_FIELDS.DESCRIPTION}
        label="Description"
      />
      <ControlledInput
        control={control}
        name={TASK_FIELDS.DUE_DATE}
        type="datetime-local"
        value={format(new Date(watch(TASK_FIELDS.DUE_DATE)), "yyyy-MM-dd'T'HH:mm")}
      />
      <ControlledSelectInput
        control={control}
        name={TASK_FIELDS.PRIORITY}
        options={TASKS_PRIORITY}
      />

      <ControlledSelectInput
        control={control}
        name={TASK_FIELDS.STATUS}
        options={taskStatus}
      />
      <CustomButton
        onClick={handleSubmit(onSubmit)}
        disabled={isCreatingTask || isUpdatingTask}
        type='button'
      >
        {isCreatingTask || isUpdatingTask ? (
          <LoadingSpinner className='w-8 h-8' />
        ) : taskId ?
          "Update Task"
          : "Add Task"
        }
      </CustomButton>
    </div>
  )
}

export default TaskForm