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
   #swagger.summary = 'Create a user'
   #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              firstName: { type: "string", example: "Edwin" },
              lastName: { type: "string", example: "Bwambale" },
              email: { type: "string", example: "edwin@example.com" },
              role: { type: "string", example: "admin" },
              phone: { type: "string", example: "+256700000000" },
              isActive: { type: "boolean", example: true }
            },
            required: ["firstName", "lastName", "email", "role", "phone"]
          }
        }
      }
   }
   #swagger.responses[201] = {
      description: 'User created successfully'
   }
   #swagger.responses[400] = {
      description: 'Invalid request data'
   }
   #swagger.responses[500] = {
      description: 'Server error'
   }
*/
router.post("/", validateUser(false), createUser);
router.put("/:id", validateObjectId("id", "user"), validateUser(true), updateUser);

/* #swagger.tags = ['Users']
   #swagger.summary = 'Update a user'
   #swagger.description = 'Updates an existing user by MongoDB ObjectId'
   #swagger.parameters['id'] = {
      in: 'path',
      description: 'User id',
      required: true,
      type: 'string'
   }
   #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              firstName: { type: "string", example: "Updated" },
              lastName: { type: "string", example: "User" },
              email: { type: "string", example: "updated@example.com" },
              role: { type: "string", example: "user" },
              phone: { type: "string", example: "+256700000001" },
              isActive: { type: "boolean", example: true }
            }
          }
        }
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
router.delete("/:id", validateObjectId("id", "user"), deleteUser);

export default router;