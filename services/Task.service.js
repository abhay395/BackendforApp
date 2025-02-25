import Task from "../model/Task.model.js";
import { User } from "../model/User.model.js";
import { CustomError } from "../utils/customeError.js";

class TaskService {
  // Create a new task
  async taskAssginToUser({ title, assigner, userIds }) {
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!assigner) missingFields.push("assigner");
    if (!userIds) missingFields.push("userIds");

    if (missingFields.length) {
      throw new CustomError(
        `Please provide the following required fields: ${missingFields.join(
          ", "
        )}`,
        422
      );
    }
    await Promise.all(
      userIds.map(async (id) => {
        const userExists = await User.exists({ _id: id }); // Check only existence
        if (!userExists) {
          throw new CustomError(
            `User with ID ${id} not found. Please check the user IDs.`,
            422
          );
        }
      })
    );

    const task = await Task.create({ title, assigner, users: userIds });
    await task.populate({
      path: "users",
      select: "name email role", // Only include necessary fields
    });
    return task;
  }
  // Get all tasks
  async getAllTasks() {
    const tasks = await Task.find({}).populate([
      {
        path: "users",
        select: "name email role",
      },
      {
        path: "completedBy",
        select: "name email role",
      },
    ]);
    return tasks;
  }

  // Get a task by ID
  async getTaskById(id) {
    const task = await Task.findById(id);
    if (!task) {
      throw new CustomError("Task not found", 404);
    }
    return task;
  }
  async getTaskByUserId(userId) {
    const tasks = await Task.find({ users: { $in: ["67bc46f65f0ec29d585b4db9"] } })
      .select("title assigner assignedDate")
      .populate("assigner", "name -_id");
    // .populate("assigner");
    return tasks;
  }
  // Edit/update task by ID
  async editTaskByAdmin({ id, body }) {
    if (!body) {
      throw new CustomError("Body is required to update task", 422);
    }
    const task = await Task.findById(id);
    if (!task) {
      throw new CustomError("Task not found", 404);
    }
    Object.assign(task, body); // Update the task with the new body properties
    await task.save(); // Save the updated task
    return task; // Return the updated task
  }
  async addUserToTaskCompletionList({ userId, taskId }) {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new CustomError("Task not found", 404);
    }
    if(task.completedBy.includes(userId)){
      throw new CustomError("User already marked task as completed", 400);
    }
    task.completedBy.push(userId);
    if (task.completedBy.length == task.users.length) {
      task.status = "Completed";
    }
    await task.save();
    return task;
  }
  // Delete task by ID
  async deleteTaskById(id) {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new CustomError("Task not found", 404);
    }
  }
}

export default new TaskService();
