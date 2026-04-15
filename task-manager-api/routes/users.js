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

router.get("/", (req, res, next) => {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get all users'
     #swagger.responses[200] = {
       description: 'Users fetched successfully'
     }
  */
  return getAllUsers(req, res, next);
});

router.get("/:id", validateObjectId("id", "user"), (req, res, next) => {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get user by id'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'User id',
       required: true,
       type: 'string'
     }
     #swagger.responses[200] = {
       description: 'User fetched successfully'
     }
     #swagger.responses[400] = {
       description: 'Invalid user id'
     }
     #swagger.responses[404] = {
       description: 'User not found'
     }
  */
  return getUserById(req, res, next);
});

router.post("/", validateUser(false), (req, res, next) => {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Create a user'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       description: 'User payload',
       schema: {
         firstName: 'Edwin',
         lastName: 'Bwambale',
         email: 'edwin@example.com',
         role: 'admin',
         phone: '+256700000000',
         isActive: true
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
  return createUser(req, res, next);
});

router.put(
  "/:id",
  validateObjectId("id", "user"),
  validateUser(true),
  (req, res, next) => {
    /* #swagger.tags = ['Users']
       #swagger.summary = 'Update a user'
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'User id',
         required: true,
         type: 'string'
       }
       #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         description: 'Updated user payload',
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
    return updateUser(req, res, next);
  }
);

router.delete("/:id", validateObjectId("id", "user"), (req, res, next) => {
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Delete a user'
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
  return deleteUser(req, res, next);
});

export default router;