import { Router } from "express";
import validateObjectId from "../middleware/validateObjectId.js";
import validateComment from "../validators/commentValidator.js";
import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentsController.js";

const router = Router();

/* #swagger.tags = ['Comments']
   #swagger.summary = 'Get all comments'
*/
router.get("/", getAllComments);

/* #swagger.tags = ['Comments']
   #swagger.summary = 'Get comment by id'
   #swagger.parameters['id'] = {
      in: 'path',
      description: 'Comment id',
      required: true,
      type: 'string'
   }
*/
router.get("/:id", validateObjectId("id", "comment"), getCommentById);

/* #swagger.tags = ['Comments']
   #swagger.summary = 'Create a comment'
   #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        taskId: 'PUT_TASK_ID_HERE',
        userId: 'PUT_USER_ID_HERE',
        content: 'This task is moving well'
      }
   }
*/
router.post("/", validateComment(false), createComment);

/* #swagger.tags = ['Comments']
   #swagger.summary = 'Update a comment'
   #swagger.parameters['id'] = {
      in: 'path',
      description: 'Comment id',
      required: true,
      type: 'string'
   }
   #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        content: 'Updated comment content'
      }
   }
*/
router.put(
  "/:id",
  validateObjectId("id", "comment"),
  validateComment(true),
  updateComment
);

/* #swagger.tags = ['Comments']
   #swagger.summary = 'Delete a comment'
   #swagger.parameters['id'] = {
      in: 'path',
      description: 'Comment id',
      required: true,
      type: 'string'
   }
*/
router.delete("/:id", validateObjectId("id", "comment"), deleteComment);

export default router;