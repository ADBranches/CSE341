const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

router.get(
  '/',
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Get all contacts'
     #swagger.description = 'Fetch all contacts.'
  */
  contactsController.getAllContacts
);

router.get(
  '/:id',
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Get one contact'
     #swagger.description = 'Fetch a single contact by id.'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Contact id',
       required: true,
       type: 'string'
     }
  */
  contactsController.getContactById
);

router.post(
  '/',
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Create contact'
     #swagger.description = 'Add a new contact.'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         firstName: 'Joshua',
         lastName: 'Asiimwe',
         email: 'joshua.asiimwe@example.com',
         favoriteColor: 'Orange',
         birthday: '2001-12-10'
       }
     }
  */
  contactsController.createContact
);

router.put(
  '/:id',
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Update contact'
     #swagger.description = 'Update an existing contact by id.'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Contact id',
       required: true,
       type: 'string'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         firstName: 'Grace',
         lastName: 'Auma',
         email: 'grace.updated@example.com',
         favoriteColor: 'Lavender',
         birthday: '2001-01-24'
       }
     }
  */
  contactsController.updateContact
);

router.delete(
  '/:id',
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Delete contact'
     #swagger.description = 'Remove a contact by id.'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Contact id',
       required: true,
       type: 'string'
     }
  */
  contactsController.deleteContact
);

module.exports = router;