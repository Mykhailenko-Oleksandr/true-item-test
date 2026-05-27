import { Task } from "../models/task.js";
import createHttpError from "http-errors";

export const getAllTasks = async (req, res) => {
  const { page = 1, perPage = 10, q, tag } = req.query;

  const tasksQuery = Task.find();

  const skip = (page - 1) * perPage;

  if (q) {
    tasksQuery.or([
      { title: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } },
    ]);
  }

  if (tag) {
    tasksQuery.where("tag").equals(tag);
  }

  const [totalTasks, tasks] = await Promise.all([
    tasksQuery.clone().countDocuments(),
    tasksQuery.skip(skip).limit(perPage).sort({ updatedAt: -1 }),
  ]);

  const totalPages = Math.ceil(totalTasks / perPage);

  res.status(200).json({ page, perPage, totalTasks, totalPages, tasks });
};

export const getTaskById = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);

  if (!task) {
    throw createHttpError(404, "Task not found");
  }

  res.status(200).json(task);
};

export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
  });

  res.status(201).json(task);
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    throw createHttpError(404, "Task not found");
  }

  res.status(200).json(task);
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;

  if (!req.body) {
    throw createHttpError(400, "There must be data to update");
  }

  const task = await Task.findByIdAndUpdate(taskId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    throw createHttpError(404, "Task not found");
  }

  res.status(200).json(task);
};
