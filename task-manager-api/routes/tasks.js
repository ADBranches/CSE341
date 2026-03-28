const express = require('express');
const validateTask = require('../middleware/validateTask');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/tasksController');

const router = express.Router();

/* #swagger.tags = ['Tasks']
   #swagger.summary = 'Get all tasks'
*/
router.get('/', getAllTasks);

/* #swagger.tags = ['Tasks']
   #swagger.summary = 'Get task by id'
   #swagger.parameters['id'] = {
      in: 'path',
      description: 'Task id',
      required: true,
      type: 'string'
   }
*/
router.get('/:id', getTaskById);

/* #swagger.tags = ['Tasks']
   #swagger.summary = 'Create a task'
   #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        title: 'Build Week 03 API',
        description: 'Create users and tasks GET/POST routes',
        status: 'pending',
        priority: 'high',
        category: 'school',
        dueDate: '2026-03-30',
        assignedTo: 'Edwin'
      }
   }
*/
router.post('/', validateTask(false), createTask);

/* #swagger.tags = ['Tasks']
   #swagger.summary = 'Update a task'
   #swagger.description = 'Updates an existing task by MongoDB ObjectId'
   #swagger.parameters['id'] = {
      in: 'path',
      description: 'Task id',
      required: true,
      type: 'string'
   }
   #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        title: 'Updated Week 03 API',
        status: 'completed',
        priority: 'medium'
      }
   }
   #swagger.responses[200] = {
      description: 'Task updated successfully'
   }
   #swagger.responses[400] = {
      description: 'Invalid request data or invalid task id'
   }
   #swagger.responses[404] = {
      description: 'Task not found'
   }
   #swagger.responses[500] = {
      description: 'Server error'
   }
*/
router.put('/:id', validateTask(true), updateTask);
router.put('/:id', validateTask(true), updateTask);

/* #swagger.tags = ['Tasks']
   #swagger.summary = 'Delete a task'
   #swagger.description = 'Deletes an existing task by MongoDB ObjectId'
   #swagger.parameters['id'] = {
      in: 'path',
      description: 'Task id',
      required: true,
      type: 'string'
   }
   #swagger.responses[200] = {
      description: 'Task deleted successfully'
   }
   #swagger.responses[400] = {
      description: 'Invalid task id'
   }
   #swagger.responses[404] = {
      description: 'Task not found'
   }
   #swagger.responses[500] = {
      description: 'Server error'
   }
*/
router.delete('/:id', deleteTask);

module.exports = router;