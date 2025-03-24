import { ITask, ITaskStatus } from '../../models/task';
import TaskCard from './TaskCard';
import { TASK_FIELDS } from '../../enum/task';
import DropArea from '../Shared/DropArea';
import { useUpdateTaskStatus } from '../../hooks/useUpdateTaskStatus';


interface ITaskStatusColumnProps {
  status: ITaskStatus;
  tasks: ITask[];
  setActiveTask: React.Dispatch<React.SetStateAction<ITask | null>>,
  activeTask: ITask | null
}

const TaskStatusColumn = ({ status, tasks, setActiveTask, activeTask }: ITaskStatusColumnProps) => {

  const { updateTaskStatus } = useUpdateTaskStatus()

  const handleEndDrag = () => {
    if (!activeTask) return;
    if (activeTask?.[TASK_FIELDS.STATUS] == status.value) return;
    updateTaskStatus({
      taskId: activeTask?.[TASK_FIELDS.ID],
      newStatus: { [TASK_FIELDS.STATUS]: status.value },
    })
  }

  return (
    <div className=" w-[230px] z-0 flex flex-col justify-center max-h-[60vh] sm:max-h-[62vh] custom-scrollbar overflow-y-auto rounded-xl pb-4 pt-0 border border-color gap-y-4">
      <h2 className="w-full text-center z-30 sticky top-0 text-[22px] font-[500] bg-[#aaa8a8]">
        {status.label}
      </h2>
      <div className='flex relative flex-col gap-y-4'>
        <DropArea onDrop={handleEndDrag} />
        {tasks?.map((task) => (
          <TaskCard key={task[TASK_FIELDS.ID]} task={task} setActiveTask={setActiveTask} />
        ))}
      </div>
      {tasks?.length == 0 && (
        <p className='w-full text-center'>No Tasks</p>
      )}
    </div>
  );
};

export default TaskStatusColumn;