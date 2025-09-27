const express = require('express');
const router = express.Router();
const { getFriend } = require('../controllers/friendController');

router.get('/', getFriend);

router.get('/', (req, res) => res.send('API is running'));
router.use('/contacts', require('./contacts'));

module.exports = router;
