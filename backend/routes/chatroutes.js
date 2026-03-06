const express = require('express');
const router = express.Router();
const { chat } = require('../controllers/chatcontroller');

router.post('/', chat);

module.exports = router;