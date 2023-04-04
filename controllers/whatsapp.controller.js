const { e } = require('../config');
const { User } = require('../models');
const { imageUploaderSingle } = require('../services');
const accountSid = 'ACa1d7033540820f01d6206b37bf6dcdc3';
const authToken = '0d6c1db8dfaba03e502c75e8d485b78d';
const client = require('twilio')(accountSid, authToken);

const sendMessage = async (messageBody, number) => {
	try {
		console.log('sendMessage');

		console.log(client.messages);
		client.messages
			.create({
				body: messageBody,
				from: 'whatsapp:+14155238886',
				to: number,
			})
			.then((message) => console.log(message.sid));
	} catch (error) {
		console.log(error);
	}
};

let booking = false;
let STAGE = 0;
const bookingFunction = (STAGE, number, obj) => {
	if (STAGE == -1) {
		sendMessage('Hello Yatri...', number);
		STAGE = 0;
	}
	if (STAGE == 0) {
		sendMessage('SEND STARTING LOCATION', number);
	}
	if (STAGE == 1) {
		sendMessage('SEND DESTINATION LOCATION', number);
	}
	if (STAGE == 2) {
		sendMessage('Confirm Location via Links… \n 1. YES \n 2. NO', number);
	}
	if (STAGE == 3) {
		if (obj.fare) {
			sendMessage(`FARE - ${obj.fare} \n 1. CONFIRM \n 2. RESTART`, number);
		}
	}
	if (STAGE == 4) {
		sendMessage('SEARCHING FOR RIDES', number);
		setTimeout(() => {
			const driverDetails = {
				Name: 'Azhar',
				Vehicle: 'MH01 1234, Blue WagonR',
				MobileNo: '+91 8299781358',
				OTP: '123456',
				ETA: 'Your Ride is x mins away..',
			};

			sendMessage('driver details', number);
		}, 5000);

		setTimeout(() => {
			sendMessage('Your OTP has Mathced & Ride Started', number);
		}, 2000);
		setTimeout(() => {
			sendMessage('Your Ride Ended', number);
		}, 5000);
	}
};

const recieveMessage = async (req, res) => {
	try {
		if (req.body.Body == 'CANCEL') {
			STAGE = -1;
		}
		// if (req.body.Body && !booking) sendMessage('text', req.body.From);

		if (req.body.Body == 'REJECT' && STAGE == 3) {
			STAGE = -1;
			bookingFunction(STAGE, req.body.From);
		}

		if (req.body.Body == 'CONFIRM' && STAGE == 3) {
			console.log('Implement Driver System SEARCHING');
			STAGE += 1;
			bookingFunction(STAGE, req.body.From);
		}

		if (req.body.Body == 'YES' && STAGE == 2) {
			console.log('calculated fare - 100');
			const obj = {
				fare: '100',
			};
			STAGE += 1;
			bookingFunction(STAGE, req.body.From, obj);
		}

		if (req.body.Latitude && req.body.Longitude && STAGE == 1) {
			console.log('Location Recieved', req.body.Latitude, req.body.Longitude);
			STAGE += 1;
			bookingFunction(STAGE, req.body.From);
		}

		if (req.body.Latitude && req.body.Longitude && STAGE == 0) {
			console.log('Location Recieved', req.body.Latitude, req.body.Longitude);
			STAGE += 1;
			bookingFunction(STAGE, req.body.From);
		}

		if (req.body.Body == 'BOOK') {
			booking = true;
			STAGE = 0;
			bookingFunction(STAGE, req.body.From);
		}

		// [Object: null prototype] {
		//   SmsMessageSid: 'SMe15f31b11bad7c30c83c0fc48f422117',
		//   NumMedia: '0',
		//   ProfileName: 'NoobMaster69',
		//   SmsSid: 'SMe15f31b11bad7c30c83c0fc48f422117',
		//   WaId: '919582085780',
		//   SmsStatus: 'received',
		//   Body: 'Azhar malik 🫂🫂',
		//   To: 'whatsapp:+14155238886',
		//   NumSegments: '1',
		//   ReferralNumMedia: '0',
		//   MessageSid: 'SMe15f31b11bad7c30c83c0fc48f422117',
		//   AccountSid: 'ACa1d7033540820f01d6206b37bf6dcdc3',
		//   From: 'whatsapp:+919582085780',
		//   ApiVersion: '2010-04-01'
		//   }

		// [Object: null prototype] {
		//   Latitude: '28.544321',
		//   Longitude: '77.2692917',
		//   SmsMessageSid: 'SM895d447525d2e4ab175cd5eb60893049',
		//   NumMedia: '0',
		//   ProfileName: 'NoobMaster69',
		//   SmsSid: 'SM895d447525d2e4ab175cd5eb60893049',
		//   WaId: '919582085780',
		//   SmsStatus: 'received',
		//   Body: '',
		//   To: 'whatsapp:+14155238886',
		//   NumSegments: '1',
		//   ReferralNumMedia: '0',
		//   MessageSid: 'SM895d447525d2e4ab175cd5eb60893049',
		//   AccountSid: 'ACa1d7033540820f01d6206b37bf6dcdc3',
		//   From: 'whatsapp:+919582085780',
		//   ApiVersion: '2010-04-01'

		console.log('recieveMessage');
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: error.message,
		});
	}
};

module.exports = {
	sendMessage,
	recieveMessage,
};
