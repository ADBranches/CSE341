const { ObjectId } = require('mongodb');
const { createError } = require('../middleware/errorHandler');
const {
  findAllTasks,
  findTaskById,
  insertTask,
  updateTaskById,
  deleteTaskById
} = require('../models/task');

async function getAllTasks(req, res, next) {
  try {
    const tasks = await findAllTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    return next(createError(500, 'Failed to fetch tasks', error.message));
  }
}

async function getTaskById(req, res, next) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid task id'));
    }

    const task = await findTaskById(id);

    if (!task) {
      return next(createError(404, 'Task not found'));
    }

    return res.status(200).json(task);
  } catch (error) {
    return next(createError(500, 'Failed to fetch task', error.message));
  }
}

async function createTask(req, res, next) {
  try {
    const result = await insertTask(req.body);

    return res.status(201).json({
      message: 'Task created successfully',
      insertedId: result.insertedId
    });
  } catch (error) {
    return next(createError(500, 'Failed to create task', error.message));
  }
}

async function updateTask(req, res, next) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid task id'));
    }

    const result = await updateTaskById(id, req.body);

    if (!result) {
      return next(createError(404, 'Task not found'));
    }

    return res.status(200).json({
      message: 'Task updated successfully',
      task: result
    });
  } catch (error) {
    return next(createError(500, 'Failed to update task', error.message));
  }
}

async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid task id'));
    }

    const result = await deleteTaskById(id);

    if (result.deletedCount === 0) {
      return next(createError(404, 'Task not found'));
    }

    return res.status(200).json({
      message: 'Task deleted successfully'
    });
  } catch (error) {
    return next(createError(500, 'Failed to delete task', error.message));
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};