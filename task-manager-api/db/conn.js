import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGODB_URI, DB_NAME } from "../config/env.js";
import mongoose from "mongoose";

let client;
let database;
let connectingPromise = null;

async function connectDB() {
  const mongoReady = Boolean(database);
  const mongooseReady = mongoose.connection.readyState === 1;

  if (mongoReady && mongooseReady) {
    return database;
  }

  if (connectingPromise) {
    return connectingPromise;
  }

  connectingPromise = (async () => {
    try {
      if (!client) {
        client = new MongoClient(MONGODB_URI, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          },
        });
      }

      if (!database) {
        await client.connect();
        database = client.db(DB_NAME);
        await database.command({ ping: 1 });
      }

      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
      }

      console.log(`MongoDB connected -> ${DB_NAME}`);
      return database;
    } catch (error) {
      if (client) {
        await client.close();
        client = null;
      }

      database = null;

      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }

      throw error;
    } finally {
      connectingPromise = null;
    }
  })();

  return connectingPromise;
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
  }

  database = null;

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

export { getDb, closeDb };
export default connectDB;