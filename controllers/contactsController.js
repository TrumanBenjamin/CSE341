// controllers/contactsController.js
const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/db');

const REQUIRED = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

function validateBody(body = {}) {
  for (const key of REQUIRED) {
    if (!body[key]) return `Missing required field: ${key}`;
  }
  return null;
}

exports.listContacts = async (req, res) => {
  try {
    const db = getDb();
    const docs = await db.collection('contacts').find({}).toArray();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContact = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id format' });

  try {
    const db = getDb();
    const doc = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    if (!doc) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createContact = async (req, res) => {
  const problem = validateBody(req.body || {});
  if (problem) return res.status(400).json({ error: problem });

  try {
    const db = getDb();
    const result = await db.collection('contacts').insertOne(req.body);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateContact = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id format' });
  const problem = validateBody(req.body || {});
  if (problem) return res.status(400).json({ error: problem });

  try {
    const db = getDb();
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Contact not found' });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id format' });

  try {
    const db = getDb();
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
