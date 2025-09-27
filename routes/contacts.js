// routes/contacts.js
const express = require('express');
const router = express.Router();
const { getDb } = require('../utils/db');
const { ObjectId } = require('mongodb');

// GET /contacts  -> all docs
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const docs = await db.collection('contacts').find({}).toArray();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /contacts/one?id=<ObjectId>  -> single doc by query param
router.get('/one', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id query parameter' });
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id format' });

  try {
    const db = getDb();
    const doc = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    if (!doc) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
