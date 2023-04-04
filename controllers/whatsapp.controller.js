const { e } = require('../config');
const { User } = require('../models');
const { imageUploaderSingle } = require('../services');

const sendMessage = async (req, res) => {
	try {
		console.log('sendMessage');
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
};

const recieveMessage = async (req, res) => {
	try {
		console.log('recieveMessage');
		console.log(req.body);
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
};

module.exports = {
	sendMessage,
	recieveMessage,
};
