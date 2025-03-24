import { ITask, ITaskStatus } from '../../models/task';
import TaskCard from './TaskCard';
import { TASK_FIELDS } from '../../enum/task';


interface ITaskStatusColumnProps {
  status: ITaskStatus
  tasks: ITask[]
}

const TaskStatusColumn = ({ status, tasks }: ITaskStatusColumnProps) => {
  return (
    <div className="flex-shrink-0 w-[230px] flex flex-col max-h-[60vh] sm:max-h-[62vh] custom-scrollbar overflow-y-auto rounded-xl pb-4 pt-0 border border-color gap-y-4">
      <h2 className="w-full text-center sticky top-0 text-[22px] font-[500] bg-[#aaa8a8]">
        {status.label}
      </h2>
      {tasks?.map((task) => (
        <TaskCard key={task[TASK_FIELDS.ID]} task={task} />
      ))}
      {tasks?.length == 0 && (
        <p className='w-full text-center'>No Tasks</p>
      )}
    </div>
  );
};

export default TaskStatusColumn;