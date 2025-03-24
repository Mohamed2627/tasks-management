import { z } from 'zod';
import { TASK_FIELDS } from '../enum/task';
import { zodResolver } from '@hookform/resolvers/zod';

export const createTaskSchema = zodResolver(z.object({
  [TASK_FIELDS.ID]: z.string().min(1),
  [TASK_FIELDS.TITLE]: z.string().min(1, "Title is required").max(100),
  [TASK_FIELDS.DESCRIPTION]: z.string().max(500).optional(),
  [TASK_FIELDS.DUE_DATE]: z.coerce.date().refine(
    (date) => date > new Date(),
    "Due date must be in the future"
  ),
  [TASK_FIELDS.PRIORITY]: z.string().min(1),
  [TASK_FIELDS.STATUS]: z.string().min(1),
}));

export const updateTaskSchema = zodResolver(z.object({
  [TASK_FIELDS.ID]: z.string().min(1),
  [TASK_FIELDS.TITLE]: z.string().min(1, "Title is required").max(100),
  [TASK_FIELDS.DESCRIPTION]: z.string().max(500).optional(),
  [TASK_FIELDS.DUE_DATE]: z.coerce.date().refine(
    (date) => date > new Date(),
    "Due date must be in the future"
  ),
  [TASK_FIELDS.STATUS]: z.string().min(1),
  [TASK_FIELDS.PRIORITY]: z.string().min(1)
}));