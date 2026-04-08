import mongoose from "mongoose";
import Project from "../models/project.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID"
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error.message
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, ownerId, description, status, startDate, endDate } = req.body;

    if (!name || !ownerId) {
      return res.status(400).json({
        success: false,
        message: "name and ownerId are required"
      });
    }

    if (!mongoose.isValidObjectId(ownerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ownerId"
      });
    }

    const newProject = await Project.create({
      name,
      ownerId,
      description,
      status,
      startDate,
      endDate
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: newProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID"
      });
    }

    if (req.body.ownerId && !mongoose.isValidObjectId(req.body.ownerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ownerId"
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID"
      });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message
    });
  }
};