const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGODB_URI, DB_NAME } = require('../config/env');

let client;
let database;

async function connectToDb() {
  if (database) return database;

  client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  });

  await client.connect();
  database = client.db(DB_NAME);
  await database.command({ ping: 1 });

  console.log(`MongoDB connected -> ${DB_NAME}`);
  return database;
}

function getDb() {
  if (!database) {
    throw new Error('Database not connected yet. Call connectToDb() first.');
  }
  return database;
}

async function closeDb() {
  if (client) {
    await client.close();
    client = null;
    database = null;
  }
}

module.exports = {
  connectToDb,
  getDb,
  closeDb
};