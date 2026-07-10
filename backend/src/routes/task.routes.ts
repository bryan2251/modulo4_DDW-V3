import { Router } from "express";
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
} from "../controllers/task.controller";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.put("/:id", toggleTask);

export default router;