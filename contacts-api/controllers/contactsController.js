// controllers/contactsController.js
const { ObjectId } = require("mongodb");
const { getDb } = require("../db/conn");

/**
 * GET /contacts
 * Return all contacts from MongoDB.
 */
async function getAllContacts(req, res, next) {
  try {
    const db = getDb();
    const contacts = await db.collection("contacts").find({}).toArray();

    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error in getAllContacts:", err);
    res.status(500).json({ message: "Failed to fetch contacts." });
  }
}

/**
 * GET /contacts/:id
 * Return a single contact by MongoDB ObjectId.
 */
async function getContactById(req, res, next) {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID format." });
    }

    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    res.status(200).json(contact);
  } catch (err) {
    console.error("Error in getContactById:", err);
    res.status(500).json({ message: "Failed to fetch contact." });
  }
}

module.exports = {
  getAllContacts,
  getContactById,
};
