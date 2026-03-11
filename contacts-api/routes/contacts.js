const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../db/conn");

const router = express.Router();

/**
 * GET /contacts
 * we're going to Return all contacts in the collection.
 */
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection("contacts").find({}).toArray();
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

/**
 * GET /contacts/:id
 * we're going to Return a single contact by _id.
 */
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    console.error("Error fetching contact:", err);
    res.status(500).json({ message: "Error fetching contact" });
  }
});

module.exports = router;
