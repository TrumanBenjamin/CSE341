const express = require('express');
const router = express.Router();
const { getFriend } = require('../controllers/friendController');

router.get('/', getFriend);

module.exports = router;
