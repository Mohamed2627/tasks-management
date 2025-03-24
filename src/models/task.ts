import { TASK_FIELDS } from "../enum/task";

export interface ITask {
  [TASK_FIELDS.ID]: string;
  [TASK_FIELDS.TITLE]: string;
  [TASK_FIELDS.DESCRIPTION]?: string;
  [TASK_FIELDS.DUE_DATE]: Date;
  [TASK_FIELDS.STATUS]: string;
  [TASK_FIELDS.PRIORITY]: string;
}

export interface ITaskStatus {
  value: string,
  label: string,
  id: string
} 