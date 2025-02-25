import TaskService from "../services/Task.service.js";
import { sendSuccessResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const assignTaskController = asyncHandler(async (req, res) => {
  const { title, users } = req.body;
  const assigner = req.user._id;
  const task = await TaskService.taskAssginToUser({
    title,
    assigner,
    userIds: users,
  });
  sendSuccessResponse(res, 201, "Task assigned successfully", { task });
});
const addUserToTaskCompletionList = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const task = await TaskService.addUserToTaskCompletionList({
    userId,
    taskId: id,
  });
  sendSuccessResponse(res, 200, "User marked task as completed successfully.", {
    task,
  });
});

const editTaskByAdminController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const task = await TaskService.editTaskByAdmin({ id, body: { title } });
  sendSuccessResponse(res, 200, "Task updated successfully.", { task });
});
const deleteTaskByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await TaskService.deleteTaskById(id);
  sendSuccessResponse(res, 200, "Task deleted successfully.");
});
const getTaskByUserController = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const tasks = await TaskService.getTaskByUserId(userId);
  sendSuccessResponse(res, 200, "Tasks retrieved successfully", { tasks });
});
const getAllTaskController = asyncHandler(async (req, res) => {
  const tasks = await TaskService.getAllTasks();
  sendSuccessResponse(res, 200, "All Tasks retrieved successfully", { tasks });
});


export {
  assignTaskController,
  addUserToTaskCompletionList,
  deleteTaskByIdController,
  editTaskByAdminController,
  getTaskByUserController,
  getAllTaskController,
};
