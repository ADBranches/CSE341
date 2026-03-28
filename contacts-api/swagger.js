require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
const parsedUrl = new URL(baseUrl);

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API documentation for the CSE341 contacts project',
  },
  host: parsedUrl.host,
  schemes: [parsedUrl.protocol.replace(':', '')],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Contacts',
      description: 'Contacts management endpoints',
    },
  ],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
