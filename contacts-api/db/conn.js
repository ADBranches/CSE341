const { MongoClient } = require('mongodb');

let client;
let database;

async function connectToDb(uri) {
  if (database) return database;

  client = new MongoClient(uri);
  await client.connect();

  database = client.db();
  console.log(`MongoDB connected: ${database.databaseName}`);

  return database;
}

function getDb() {
  if (!database) {
    throw new Error('Database not initialized. Call connectToDb() first.');
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
  closeDb,
};