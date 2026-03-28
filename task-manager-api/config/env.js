require('dotenv').config();

const requiredVars = [
  'PORT',
  'NODE_ENV',
  'BASE_URL',
  'CORS_ORIGIN',
  'DB_NAME',
  'MONGODB_URI'
];

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
  DB_NAME: process.env.DB_NAME,
  MONGODB_URI: process.env.MONGODB_URI
};