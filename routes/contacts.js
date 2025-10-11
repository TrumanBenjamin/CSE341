/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact management API
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Returns all contacts
 *
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact created
 *       400:
 *         description: Invalid request body
 */

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get one contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a contact
 *       404:
 *         description: Contact not found
 *
 *   put:
 *     summary: Update an existing contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 *
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 */


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
