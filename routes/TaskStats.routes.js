import express from "express";
import {
  getTaskByAssigner,
  getCompletionStats,
  getRecentTasks,
  getTaskByUser,
  getTopCompletedUser,
} from "../controller/TaskStats.controller.js";
import { dummyauthMiddlewareForUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/task-by-assigner", getTaskByAssigner);
router.get("/completion-stats", getCompletionStats);
router.get("/recent-tasks", getRecentTasks);
router.get("/task-by-user", dummyauthMiddlewareForUser,getTaskByUser);
router.get("/top-completed-users", getTopCompletedUser);

export default router;
