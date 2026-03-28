require('dotenv').config();

const express = require('express');
const { connectToDb } = require('./db/conn');
const contactsRouter = require('./routes/contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const app = express();

const parsedBaseUrl = new URL(BASE_URL);
swaggerDocument.host = parsedBaseUrl.host;
swaggerDocument.schemes = [parsedBaseUrl.protocol.replace(':', '')];

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Contacts API is running.',
  });
});

app.use('/contacts', contactsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error.',
  });
});

async function startServer() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Missing MONGODB_URI in .env');
  }

  await connectToDb(uri);

  app.listen(PORT, () => {
    console.log(`Server running on ${BASE_URL}`);
  });
}

startServer().catch((error) => {
  console.error('Startup failed:', error.message);
  process.exit(1);
});

module.exports = app;