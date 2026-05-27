import axios from "axios";
import type { Tag } from "../types/tag";
import type { Task } from "../types/task";

axios.defaults.baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "http://localhost:3001/api";

export interface ResponseAPI {
  page: number;
  limit: number;
  totalTasks: number;
  totalPages: number;
  tasks: Task[];
}

export interface TasksFormData {
  title: string;
  content: string;
  tag: Tag[];
}

export async function fetchTasks(
  searchWord: string,
  page: number = 1,
  perPage: number = 12,
  tag?: string,
) {
  if (tag === "All") {
    tag = undefined;
  }

  const { data } = await axios.get<ResponseAPI>("/tasks", {
    params: {
      q: searchWord,
      tag: tag,
      page,
      perPage,
    },
  });
  return data;
}

export async function fetchTaskById(id: string) {
  const { data } = await axios.get<Task>(`/tasks/${id}`);
  return data;
}

export async function deleteTask(id: string) {
  const { data } = await axios.delete<Task>(`/tasks/${id}`);
  return data;
}

export async function createTask(data: TasksFormData) {
  const res = await axios.post<Task>("/tasks", data);
  return res.data;
}

export async function updateTask(id: string, data: TasksFormData) {
  const res = await axios.patch<Task>(`/tasks/${id}`, data);
  return res.data;
}
