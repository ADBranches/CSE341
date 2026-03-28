const { ObjectId } = require('mongodb');
const { getDb } = require('../db/conn');

function tasksCollection() {
  return getDb().collection('tasks');
}

async function findAllTasks() {
  return tasksCollection().find({}).toArray();
}

async function findTaskById(id) {
  return tasksCollection().findOne({ _id: new ObjectId(id) });
}

async function insertTask(payload) {
  const task = {
    title: payload.title ?? '',
    description: payload.description ?? '',
    status: payload.status ?? 'pending',
    priority: payload.priority ?? 'medium',
    category: payload.category ?? '',
    dueDate: payload.dueDate ?? null,
    assignedTo: payload.assignedTo ?? '',
    createdAt: new Date()
  };

  return tasksCollection().insertOne(task);
}

async function updateTaskById(id, payload) {
  const allowedFields = [
    'title',
    'description',
    'status',
    'priority',
    'category',
    'dueDate',
    'assignedTo'
  ];

  const updates = {};

  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      updates[field] = payload[field];
    }
  }

  updates.updatedAt = new Date();

  return tasksCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updates },
    { returnDocument: 'after' }
  );
}

async function deleteTaskById(id) {
  return tasksCollection().deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  findAllTasks,
  findTaskById,
  insertTask,
  updateTaskById,
  deleteTaskById
};