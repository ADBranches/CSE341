import { Router } from "express";
import validateObjectId from "../middleware/validateObjectId.js";
import validateTask from "../validators/taskValidator.js";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/tasksController.js";

const router = Router();

router.get("/", getAllTasks);
router.get("/:id", validateObjectId("id", "task"), getTaskById);
router.post("/", validateTask(false), createTask);
router.put("/:id", validateObjectId("id", "task"), validateTask(true), updateTask);
router.delete("/:id", validateObjectId("id", "task"), deleteTask);

export default router;