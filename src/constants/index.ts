import { TASK_PRIORITY } from "../enum/task";

export const BASE_URL = 'http://localhost:4000';

export const TASKS_PRIORITY = [
  {
    value: TASK_PRIORITY.LOW,
    label: 'Low',
  },
  {
    value: TASK_PRIORITY.MEDIUM,
    label: 'Medium',
  },
  {
    value: TASK_PRIORITY.HIGH,
    label: 'High',
  },
  {
    value: TASK_PRIORITY.URGENT,
    label: 'Urgent',
  }
]

export const customModalStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0
  },
  overlay: {
    backgroundColor: '#06102365',
    zIndex: 120
  },
};