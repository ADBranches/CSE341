import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGODB_URI, DB_NAME } from "../config/env.js";
import mongoose from "mongoose";

let client;
let database;
let mongooseReady = false;

async function connectDB() {
  if (database) return database;

  client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  database = client.db(DB_NAME);
  await database.command({ ping: 1 });

  if (!mongooseReady && mongoose.connection.readyState !== 1) {
    await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
    mongooseReady = true;
  }

  console.log(`MongoDB connected -> ${DB_NAME}`);
  return database;
}

function getDb() {
  if (!database) {
    throw new Error("Database not connected yet. Call connectDB() first.");
  }
  return database;
}

async function closeDb() {
  if (client) {
    await client.close();
    client = null;
    database = null;
  }

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    mongooseReady = false;
  }
}

export { getDb, closeDb };
export default connectDB;