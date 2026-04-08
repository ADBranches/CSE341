import { ObjectId } from "mongodb";
import { getDb } from "../db/conn.js";

function usersCollection() {
  return getDb().collection("users");
}

async function findAllUsers() {
  return usersCollection().find({}).toArray();
}

async function findUserById(id) {
  return usersCollection().findOne({ _id: new ObjectId(id) });
}

async function insertUser(payload) {
  const user = {
    firstName: payload.firstName ?? "",
    lastName: payload.lastName ?? "",
    email: payload.email ?? "",
    role: payload.role ?? "user",
    phone: payload.phone ?? "",
    isActive: payload.isActive ?? true,
    createdAt: new Date(),
  };

  return usersCollection().insertOne(user);
}

async function updateUserById(id, payload) {
  const allowedFields = [
    "firstName",
    "lastName",
    "email",
    "role",
    "phone",
    "isActive",
  ];

  const updates = {};

  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      updates[field] = payload[field];
    }
  }

  updates.updatedAt = new Date();

  return usersCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updates },
    { returnDocument: "after" }
  );
}

async function deleteUserById(id) {
  return usersCollection().deleteOne({ _id: new ObjectId(id) });
}

export {
  findAllUsers,
  findUserById,
  insertUser,
  updateUserById,
  deleteUserById,
};