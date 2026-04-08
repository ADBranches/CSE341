import express from "express";
import validateUser from "../middleware/validateUser.js";
import validateObjectId from "../middleware/validateObjectId.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

const router = express.Router();

/* #swagger.tags = ['Users']
   #swagger.summary = 'Get all users'
*/
router.get("/", getAllUsers);

/* #swagger.tags = ['Users']
   #swagger.summary = 'Get user by id'
   #swagger.parameters['id'] = {
      in: 'path',
      description: 'User id',
      required: true,
      type: 'string'
   }
*/
router.get("/:id", validateObjectId("id", "user"), getUserById);

/* #swagger.tags = ['Users']
   #swagger.summary = 'Create a user'
   #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        firstName: 'Edwin',
        lastName: 'Bwambale',
        email: 'edwin@example.com',
        role: 'admin',
        phone: '+256700000000',
        isActive: true
      }
   }
*/
router.post("/", validateUser(false), createUser);

/* #swagger.tags = ['Users']
   #swagger.summary = 'Update a user'
   #swagger.description = 'Updates an existing user by MongoDB ObjectId'
   #swagger.parameters['id'] = {
      in: 'path',
      description: 'User id',
      required: true,
      type: 'string'
   }
   #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        firstName: 'Updated',
        lastName: 'User',
        email: 'updated@example.com',
        role: 'user',
        phone: '+256700000001',
        isActive: true
      }
   }
   #swagger.responses[200] = {
      description: 'User updated successfully'
   }
   #swagger.responses[400] = {
      description: 'Invalid request data or invalid user id'
   }
   #swagger.responses[404] = {
      description: 'User not found'
   }
   #swagger.responses[500] = {
      description: 'Server error'
   }
*/
router.put("/:id", validateObjectId("id", "user"), validateUser(true), updateUser);

/* #swagger.tags = ['Users']
   #swagger.summary = 'Delete a user'
   #swagger.description = 'Deletes an existing user by MongoDB ObjectId'
   #swagger.parameters['id'] = {
      in: 'path',
      description: 'User id',
      required: true,
      type: 'string'
   }
   #swagger.responses[200] = {
      description: 'User deleted successfully'
   }
   #swagger.responses[400] = {
      description: 'Invalid user id'
   }
   #swagger.responses[404] = {
      description: 'User not found'
   }
   #swagger.responses[500] = {
      description: 'Server error'
   }
*/
router.delete("/:id", validateObjectId("id", "user"), deleteUser);

export default router;