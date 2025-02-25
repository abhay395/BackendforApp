import TaskAggregationService from "../services/TaskAggregation.service.js";
import { sendSuccessResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/User.model.js";
import Task from "../model/Task.model.js";

const getTaskByAssigner = asyncHandler(async (req, res) => {
  const stats = await TaskAggregationService.getTaskByAssigner();
  sendSuccessResponse(res, 200, "Tasks grouped by assigner", { stats });
});

const getCompletionStats = asyncHandler(async (req, res) => {
  const stats = await TaskAggregationService.getCompletionStats();
  sendSuccessResponse(res, 200, "Task Completion Stats", { stats });
});
const getRecentTasks = asyncHandler(async (req, res) => {
  const tasks = await TaskAggregationService.getRecentTasks();
  sendSuccessResponse(res, 200, "Recent tasks retrieved", { tasks });
});
const getTopCompletedUser = asyncHandler(async (req, res) => {
  const stats = await TaskAggregationService.getTopCompletedUser();
  // console.log(stats)
  sendSuccessResponse(res, 200, "Top users by task completion", { stats });
});
const getTaskByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // console.log(userId)
  // const task = await Task.find({
  //   users:{$in:[userId]}
  // })
  const tasks = await TaskAggregationService.getTaskByUser(userId);
  // console.log(tasks)
  sendSuccessResponse(res, 200, "Tasks retrieved for user", { tasks });
});
export {
  getTaskByAssigner,
  getCompletionStats,
  getRecentTasks,
  getTaskByUser,
  getTopCompletedUser,
};
