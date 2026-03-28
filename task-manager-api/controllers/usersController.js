const { ObjectId } = require('mongodb');
const { createError } = require('../middleware/errorHandler');
const {
  findAllUsers,
  findUserById,
  insertUser,
  updateUserById,
  deleteUserById
} = require('../models/user');

async function getAllUsers(req, res, next) {
  try {
    const users = await findAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return next(createError(500, 'Failed to fetch users', error.message));
  }
}

async function getUserById(req, res, next) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid user id'));
    }

    const user = await findUserById(id);

    if (!user) {
      return next(createError(404, 'User not found'));
    }

    return res.status(200).json(user);
  } catch (error) {
    return next(createError(500, 'Failed to fetch user', error.message));
  }
}

async function createUser(req, res, next) {
  try {
    const result = await insertUser(req.body);

    return res.status(201).json({
      message: 'User created successfully',
      insertedId: result.insertedId
    });
  } catch (error) {
    return next(createError(500, 'Failed to create user', error.message));
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid user id'));
    }

    const result = await updateUserById(id, req.body);

    if (!result) {
      return next(createError(404, 'User not found'));
    }

    return res.status(200).json({
      message: 'User updated successfully',
      user: result
    });
  } catch (error) {
    return next(createError(500, 'Failed to update user', error.message));
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid user id'));
    }

    const result = await deleteUserById(id);

    if (result.deletedCount === 0) {
      return next(createError(404, 'User not found'));
    }

    return res.status(200).json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    return next(createError(500, 'Failed to delete user', error.message));
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};