import mongoose from "mongoose";
import Task from "../models/task.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("projectId", "name status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID"
      });
    }

    const task = await Task.findById(id)
      .populate("projectId", "name status");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch task",
      error: error.message
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
      assignedTo,
      createdBy,
      tags
    } = req.body;

    if (!title || !projectId || !createdBy) {
      return res.status(400).json({
        success: false,
        message: "title, projectId, and createdBy are required"
      });
    }

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid projectId"
      });
    }

    if (!mongoose.isValidObjectId(createdBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid createdBy"
      });
    }

    if (assignedTo && !mongoose.isValidObjectId(assignedTo)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignedTo"
      });
    }

    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
      assignedTo,
      createdBy,
      tags
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID"
      });
    }

    if (req.body.projectId && !mongoose.isValidObjectId(req.body.projectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid projectId"
      });
    }

    if (req.body.createdBy && !mongoose.isValidObjectId(req.body.createdBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid createdBy"
      });
    }

    if (req.body.assignedTo && !mongoose.isValidObjectId(req.body.assignedTo)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignedTo"
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: error.message
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID"
      });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message
    });
  }
};