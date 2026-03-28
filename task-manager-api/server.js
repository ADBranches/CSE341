const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const { PORT, CORS_ORIGIN, BASE_URL } = require('./config/env');
const { connectToDb } = require('./db/conn');

const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Task Manager API is running',
    baseUrl: BASE_URL
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok'
  });
});

const swaggerPath = path.join(__dirname, 'swagger.json');
if (fs.existsSync(swaggerPath)) {
  const swaggerDocument = require(swaggerPath);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get('/swagger.json', (req, res) => {
    res.status(200).json(swaggerDocument);
  });
}

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${BASE_URL}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  });