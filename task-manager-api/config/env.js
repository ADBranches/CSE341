require('dotenv').config();

const requiredVars = [
  'PORT',
  'NODE_ENV',
  'BASE_URL',
  'CORS_ORIGIN',
  'DB_NAME',
  'MONGODB_URI'
];
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


for (const key of requiredVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

module.exports = {
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV,
  BASE_URL: process.env.BASE_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  PORT,
  NODE_ENV,
  BASE_URL,
  CORS_ORIGIN,
  DB_NAME: process.env.DB_NAME,
  MONGODB_URI: process.env.MONGODB_URI
};