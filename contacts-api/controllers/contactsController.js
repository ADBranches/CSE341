const Contact = require('../models/contact');

function hasRequiredFields(body) {
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'favoriteColor',
    'birthday',
  ];

  return requiredFields.every((field) => {
    return typeof body[field] === 'string' && body[field].trim() !== '';
  });
}

async function getAllContacts(req, res, next) {
  try {
    const contacts = await Contact.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  try {
    const { id } = req.params;

    if (!Contact.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid contact id.' });
    }

    const contact = await Contact.getContactById(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  try {
    if (!hasRequiredFields(req.body)) {
      return res.status(400).json({
        message:
          'All fields are required: firstName, lastName, email, favoriteColor, birthday.',
      });
    }

    const createdContact = await Contact.createContact(req.body);

    res.status(201).json({
      message: 'Contact created successfully.',
      id: createdContact._id,
      contact: createdContact,
    });
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  try {
    const { id } = req.params;

    if (!Contact.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid contact id.' });
    }

    if (!hasRequiredFields(req.body)) {
      return res.status(400).json({
        message:
          'All fields are required: firstName, lastName, email, favoriteColor, birthday.',
      });
    }

    const result = await Contact.updateContact(id, req.body);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact updated successfully.' });
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;

    if (!Contact.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid contact id.' });
    }

    const result = await Contact.deleteContact(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};