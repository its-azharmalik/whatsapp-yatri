const express = require('express');

const {
	sendMessage,
	recieveMessage,
} = require('../controllers/whatsapp.controller');

const router = express.Router();

router.post('/send', sendMessage);
router.post('/recieve', recieveMessage);

module.exports = router;
