import Task from "../model/Task.model.js";

class TaskAggregationService {
  async getTaskByAssigner() {
    return await Task.aggregate([
      {
        $group: {
          _id: "$assigner",
          totalTask: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "assignerDetails",
        },
      },
      {
        $project: {
          assigner: { $arrayElemAt: ["$assignerDetails.name", 0] },
          totalTask: 1,
        },
      },
    ]);
  }
  async getCompletionStats() {
    return await Task.aggregate([
      {
        $project: {
          title: 1,
          assinger: 1,
          totalUsers: { $size: "$users" },
          completedUsers: { $size: "$completedBy" },
        },
      },
      {
        $project: {
          title: 1,
          assigner: 1,
          completedUsers: 1,
          completionPercentage: {
            $multiply: [{ $divide: ["$completedUsers", "$totalUsers"] }, 100],
          },
        },
      },
    ]);
  }
  async getRecentTasks() {
    return await Task.find().sort({ assignedDate: -1 }).limit(10);
  }
  // async getTaskByUser(userId) {
  //   return await Task.aggregate([
  //     {
  //       $match: {
  //         users: { $in: [userId] },
  //       },
  //     },
  //     {
  //       $sort: { assignedDate: -1 },
  //     },
  //   ]);
  // }
  async getTopCompletedUser() {
    return await Task.aggregate([
      { $unwind: "$completedBy" },
      {
        $group: {
          _id: "$completedBy",
          taskCompleted: { $sum: 1 },
        },
      },
      { $sort: { taskCompleted: -1 } },
      { $limit: 5 },
    ]);
  }
}

export default new TaskAggregationService();
