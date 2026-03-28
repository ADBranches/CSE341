const { ObjectId } = require('mongodb');
const { getDb } = require('../db/conn');

function contactsCollection() {
  return getDb().collection('contacts');
}

function isValidObjectId(id) {
  return ObjectId.isValid(id);
}

function normalizeContact(payload) {
  return {
    firstName: String(payload.firstName || '').trim(),
    lastName: String(payload.lastName || '').trim(),
    email: String(payload.email || '').trim(),
    favoriteColor: String(payload.favoriteColor || '').trim(),
    birthday: String(payload.birthday || '').trim(),
  };
}

async function getAllContacts() {
  return contactsCollection()
    .find({})
    .sort({ lastName: 1, firstName: 1 })
    .toArray();
}

async function getContactById(id) {
  if (!isValidObjectId(id)) return null;

  return contactsCollection().findOne({ _id: new ObjectId(id) });
}

async function createContact(payload) {
  const contact = normalizeContact(payload);
  const result = await contactsCollection().insertOne(contact);

  return {
    _id: result.insertedId,
    ...contact,
  };
}

async function updateContact(id, payload) {
  if (!isValidObjectId(id)) {
    return { invalidId: true, matchedCount: 0, modifiedCount: 0 };
  }

  const updatedContact = normalizeContact(payload);

  const result = await contactsCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedContact }
  );

  return result;
}

async function deleteContact(id) {
  if (!isValidObjectId(id)) {
    return { invalidId: true, deletedCount: 0 };
  }

  const result = await contactsCollection().deleteOne({
    _id: new ObjectId(id),
  });

  return result;
}

async function countContacts() {
  return contactsCollection().countDocuments();
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  countContacts,
  isValidObjectId,
};