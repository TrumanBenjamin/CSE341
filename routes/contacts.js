
const express = require('express');
const router = express.Router();
const {listContacts, getContact, createContact, updateContact, deleteContact} = require('../controllers/contactsController');

// GET all
router.get('/', listContacts);

// GET one by id
router.get('/:id', getContact);

// POST new contact 
router.post('/', createContact);

// PUT update by id 
router.put('/:id', updateContact);

// DELETE by id 
router.delete('/:id', deleteContact);

module.exports = router;
