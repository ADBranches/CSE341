import dotenv from "dotenv";
import connectDB from "../db/conn.js";
import User from "../models/user.js";
import Project from "../models/project.js";
import Task from "../models/task.js";

dotenv.config();

const run = async () => {
  await connectDB();

  const stamp = Date.now();

  const user = await User.create({
    oauthId: `github-${stamp}`,
    provider: "github",
    displayName: "Phase Two Test User",
    email: `phase2-${stamp}@example.com`,
    role: "user"
  });

  const project = await Project.create({
    name: "Phase 2 Setup Project",
    description: "Project created to verify schema inserts",
    ownerId: user._id,
    status: "active",
    startDate: new Date()
  });

  const task = await Task.create({
    title: "Verify MongoDB model inserts",
    description: "Confirm users, projects, and tasks collections exist",
    status: "todo",
    priority: "high",
    dueDate: new Date(),
    projectId: project._id,
    assignedTo: user._id,
    createdBy: user._id,
    tags: ["phase2", "verification"]
  });

  console.log({
    userId: user._id.toString(),
    projectId: project._id.toString(),
    taskId: task._id.toString()
  });

  process.exit(0);
};

run().catch((error) => {
  console.error("Model test failed:", error.message);
  process.exit(1);
});
