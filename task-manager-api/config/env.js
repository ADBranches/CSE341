require('dotenv').config();

const PORT = Number(process.env.PORT || 3000);
const NODE_ENV = process.env.NODE_ENV || 'development';

const BASE_URL =
  process.env.BASE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  `http://localhost:${PORT}`;

const CORS_ORIGIN =
  process.env.CORS_ORIGIN ||
  process.env.RENDER_EXTERNAL_URL ||
  `http://localhost:${PORT}`;

const DB_NAME = process.env.DB_NAME;
const MONGODB_URI = process.env.MONGODB_URI;

const requiredVars = {
  DB_NAME,
  MONGODB_URI
};

for (const [key, value] of Object.entries(requiredVars)) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

module.exports = {
  PORT,
  NODE_ENV,
  BASE_URL,
  CORS_ORIGIN,
  DB_NAME,
  MONGODB_URI
};