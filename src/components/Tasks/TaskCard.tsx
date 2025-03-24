import { Link } from "react-router";
import { TASKS_PRIORITY } from "../../constants";
import { TASK_FIELDS } from "../../enum/task";
import { ITask } from '../../models/task';

interface ITaskCardProps {
  task: ITask;
  setActiveTask: React.Dispatch<React.SetStateAction<ITask | null>>
}

const TaskCard = ({ task, setActiveTask }: ITaskCardProps) => {

  // Functions--------------------------------------
  const formattedDueDate = new Date(task[TASK_FIELDS.DUE_DATE]).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const getPriority = (value: string) => {
    return TASKS_PRIORITY.find((priority) => priority.value === value)?.label
  }

  return (
    <div
      draggable
      onDragStart={() => setActiveTask(task)}
      onDragEnd={() => setActiveTask(null)}
      className="relative border cursor-grab active:bg-gray-700 active:text-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200 mx-2">
      <Link to={`${task[TASK_FIELDS.ID]}`} className="text-lg underline text-primary font-semibold mb-2">{task[TASK_FIELDS.TITLE]}</Link>
      {task[TASK_FIELDS.DESCRIPTION] && (
        <p className="text-sm mb-4">{task[TASK_FIELDS.DESCRIPTION]}</p>
      )}

      <div className="flex flex-col space-y-2 text-sm">
        <div className="flex items-center">
          <span className="font-medium">Due:</span>
          <span className="ml-2">{formattedDueDate}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">Priority:</span>
          <span className="ml-2 capitalize">{getPriority(task[TASK_FIELDS.PRIORITY])}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;