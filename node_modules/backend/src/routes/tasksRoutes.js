import { Router } from "express";

import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/tasksController.js";
import { celebrate } from "celebrate";
import {
  createTaskSchema,
  getAllTasksSchema,
  taskIdSchema,
  updateTaskSchema,
} from "../validations/tasksValidation.js";

const router = Router();

router.get("/api/tasks", celebrate(getAllTasksSchema), getAllTasks);
router.get("/api/tasks/:taskId", celebrate(taskIdSchema), getTaskById);

router.post("/api/tasks", celebrate(createTaskSchema), createTask);

router.delete("/api/tasks/:taskId", celebrate(taskIdSchema), deleteTask);

router.patch("/api/tasks/:taskId", celebrate(updateTaskSchema), updateTask);

export default router;
