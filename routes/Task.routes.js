import express from "express";
import {
  assignTaskController,
  addUserToTaskCompletionList,
  deleteTaskByIdController,
  editTaskByAdminController,
  getTaskByUserController,
  getAllTaskController
} from "../controller/Task.controller.js";
import {
  authMiddleware,
  dummyauthMiddlewareForAdmin,
  dummyauthMiddlewareForUser
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Set all the routes
router.post("/assignTask", dummyauthMiddlewareForAdmin, assignTaskController);
router.post(
  "/completed/:id",
  dummyauthMiddlewareForUser,
  addUserToTaskCompletionList
);
router.delete("/:id", dummyauthMiddlewareForAdmin, deleteTaskByIdController);
router.patch("/:id", dummyauthMiddlewareForAdmin, editTaskByAdminController);
router.get("/userTasks", dummyauthMiddlewareForUser, getTaskByUserController);
router.get("/allTask",dummyauthMiddlewareForAdmin,getAllTaskController)
const taskRouter = router;

export default taskRouter;
