const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

let _db;

/**
 *  func that Connects to MongoDB once and reuses the same connection.
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
    _db = client.db();
    console.log(" Connected to MongoDB successfully.");
    return callback();
  } catch (err) {
    console.error(" Failed to connect to MongoDB:", err);
    return callback(err);
  }
}

/**
 * Geting the active DB instance.
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
