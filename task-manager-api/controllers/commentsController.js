import mongoose from "mongoose";
import Comment from "../models/comment.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("taskId", "title status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
      error: error.message,
    });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment ID",
      });
    }

    const comment = await Comment.findById(id).populate("taskId", "title status");

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch comment",
      error: error.message,
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { taskId, userId, content } = req.body;

    if (!taskId || !userId || !content) {
      return res.status(400).json({
        success: false,
        message: "taskId, userId, and content are required",
      });
    }

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid taskId",
      });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    const newComment = await Comment.create({
      taskId,
      userId,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create comment",
      error: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment ID",
      });
    }

    if (req.body.taskId && !mongoose.isValidObjectId(req.body.taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid taskId",
      });
    }

    if (req.body.userId && !mongoose.isValidObjectId(req.body.userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    const payload = { ...req.body, editedAt: new Date() };

    const updatedComment = await Comment.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update comment",
      error: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment ID",
      });
    }

    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete comment",
      error: error.message,
    });
  }
};