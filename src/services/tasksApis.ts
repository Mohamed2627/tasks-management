import { axiosInstance } from "../config/axios";
import { TASK_FIELDS } from "../enum/task";
import { ITask, ITaskStatus } from "../models/task";
import { delay } from "../utils";


export const createTask = async (task: ITask): Promise<ITask> => {
  try {
    await delay(1000);
    const createdTask = await axiosInstance.post('/tasks', task)
    return createdTask.data
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create task")
  }
}

export const updateTask = async (task: ITask): Promise<ITask> => {
  try {
    await delay(1000);
    const updatedTask = await axiosInstance.put(`/tasks/${task[TASK_FIELDS.ID]}`, task)
    return updatedTask.data
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update task")
  }
}

export const updateTaskStatus = async (taskId: string, newStatus: { [TASK_FIELDS.STATUS]: string }): Promise<ITask> => {
  try {
    await delay(500);
    const updatedTaskStatus = await axiosInstance.patch(`/tasks/${taskId}`, newStatus)
    return updatedTaskStatus.data
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update task status")
  }
}

export const getTaskDetails = async (taskId: string): Promise<ITask> => {
  try {
    await delay(1000);
    const taskDetails = await axiosInstance.get(`/tasks/${taskId}`);
    return taskDetails.data
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get task details")
  }
}

export const getTasks = async (searchParams: string): Promise<ITask[]> => {
  try {
    await delay(1000);
    const tasks = await axiosInstance.get(`/tasks?${searchParams}`);
    return tasks.data
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get tasks");
  }
}

export const getTaskStatus = async (): Promise<ITaskStatus[]> => {
  try {
    await delay(1000);
    const taskStatus = await axiosInstance.get(`/status`);
    return taskStatus.data
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get task status");
  }
}