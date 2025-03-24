import { useGetStatus } from '../hooks/useGetStatus'
import { StyledInput } from '../components/Form/StyledInput';
import { useGetTasks } from '../hooks/useGetTasks';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { StyledSelectInput } from '../components/Form/StyledSelectInput';
import { TASK_FIELDS } from '../enum/task';
import { TASKS_PRIORITY } from '../constants';
import TaskStatusColumn from '../components/Tasks/TaskStatusColumn';

const Tasks = () => {

  // Hooks------------------------------------------
  const { taskStatus } = useGetStatus();
  const { tasks } = useGetTasks();
  const [searchParams, setSearchParams] = useSearchParams();

  // States-----------------------------------------
  const [filters, setFilters] = useState({
    searchInput: '',
    filterStatus: '',
    filterPriority: '',
  });

  // Functions--------------------------------------
  const handleFiltersChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  // Effects----------------------------------------
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (filters.searchInput) {
      newSearchParams.set(TASK_FIELDS.TITLE, filters.searchInput);
    } else {
      newSearchParams.delete(TASK_FIELDS.TITLE);
    }

    if (filters.filterPriority) {
      newSearchParams.set(TASK_FIELDS.PRIORITY, filters.filterPriority);
    } else {
      newSearchParams.delete(TASK_FIELDS.PRIORITY);
    }

    if (filters.filterStatus) {
      newSearchParams.set(TASK_FIELDS.STATUS, filters.filterStatus);
    } else {
      newSearchParams.delete(TASK_FIELDS.STATUS);
    }

    setSearchParams(newSearchParams);
  }, [filters, searchParams, setSearchParams]);


  return (
    <div className='flex flex-col items-center'>
      <StyledInput
        placeholder='Search bt task title'
        className='max-w-[400px] mt-4'
        value={filters.searchInput}
        onChange={(e) => handleFiltersChange("searchInput", e.target.value)}
      />
      <div className='flex flex-col md:flex-row gap-x-20 gap-y-6 my-4 md:self-start'>
        <StyledSelectInput
          className='max-w-[200px]'
          options={[{ value: "", label: "filter by status" }, ...taskStatus]}
          value={filters.filterStatus}
          onChange={(e) => handleFiltersChange("filterStatus", e.target.value)}
        />
        <StyledSelectInput
          className='max-w-[200px]'
          options={[{ value: "", label: "filter by Priority" }, ...TASKS_PRIORITY]}
          value={filters.filterPriority}
          onChange={(e) => handleFiltersChange("filterPriority", e.target.value)}
        />
      </div>
      <div className="w-full max-w-[calc(100vw-60px)] md:max-w-[calc(100vw-310px)] overflow-x-auto custom-scrollbar border p-4 border-color my-6">
        <div className="flex flex-row items-start justify-start gap-x-6 w-max">
          {taskStatus?.map((status) => (
            // For better performance, we shouldn't do filter here and fetch the tasks internally from the TaskStatusColumn component
            // But as we want to make filtering on all tasks and we already have them, I think it is ok to do this for now,
            <TaskStatusColumn
              key={status.value}
              status={status}
              tasks={tasks.filter(
                (task) => task[TASK_FIELDS.STATUS] === status.value
              )}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Tasks