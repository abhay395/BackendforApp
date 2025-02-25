import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  assigner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  assignedDate: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field before saving

const Task = mongoose.model("Task", taskSchema);
export default Task;
