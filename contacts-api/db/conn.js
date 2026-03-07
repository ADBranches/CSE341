// db/conn.js
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

let _db;

/**
 * Connect to MongoDB once and reuse the same connection.
 */
async function connectToServer(callback) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI is not defined in .env");
    return callback(new Error("MONGODB_URI missing"));
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    // Use a specific DB (you can name it contacts-db in the URI)
    _db = client.db(); // default DB from URI
    console.log("✅ Connected to MongoDB successfully.");
    return callback();
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    return callback(err);
  }
}

/**
 * Get the active DB instance.
 */
function getDb() {
  if (!_db) {
    throw new Error("Database not initialized. Call connectToServer first.");
  }
  return _db;
}

module.exports = {
  connectToServer,
  getDb,
};
