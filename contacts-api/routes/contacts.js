const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

router.get(
  '/',
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Get all contacts'
     #swagger.description = 'Returns all contacts from the database.'
  */
  contactsController.getAllContacts
);

router.get(
  '/:id',
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Get contact by id'
     #swagger.description = 'Returns one contact using its MongoDB ObjectId.'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId',
       required: true,
       type: 'string'
     }
  */
  contactsController.getContactById
);

router.post(
  '/',
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Create a new contact'
     #swagger.description = 'Creates a new contact.'
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
     #swagger.summary = 'Update a contact'
     #swagger.description = 'Updates an existing contact by id.'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId',
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
     #swagger.summary = 'Delete a contact'
     #swagger.description = 'Deletes a contact by id.'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId',
       required: true,
       type: 'string'
     }
  */
  contactsController.deleteContact
);

module.exports = router;