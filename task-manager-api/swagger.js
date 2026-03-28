const swaggerAutogen = require('swagger-autogen')();
const { BASE_URL } = require('./config/env');

const doc = {
  info: {
    title: 'Task Manager API',
    description: 'CSE 341 Week 03 Task Manager API documentation',
    version: '1.0.0'
  },
  host: BASE_URL.replace(/^https?:\/\//, ''),
  schemes: [BASE_URL.startsWith('https') ? 'https' : 'http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Users',
      description: 'User management endpoints'
    },
    {
      name: 'Tasks',
      description: 'Task management endpoints'
    }
  ],
  definitions: {
    UserInput: {
      firstName: 'Edwin',
      lastName: 'Bwambale',
      email: 'edwin@example.com',
      role: 'admin',
      phone: '+256700000000',
      isActive: true
    },
    TaskInput: {
      title: 'Build Week 03 API',
      description: 'Create users and tasks GET/POST routes',
      status: 'pending',
      priority: 'high',
      category: 'school',
      dueDate: '2026-03-30',
      assignedTo: 'Edwin'
    },
    ErrorResponse: {
      message: 'Invalid user id'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);