const { e } = require('../config');
const { User } = require('../models');
const Rides = require('../models/Rides');
const { imageUploaderSingle, bookingService } = require('../services');
const accountSid = 'ACa1d7033540820f01d6206b37bf6dcdc3';
const authToken = '0d6c1db8dfaba03e502c75e8d485b78d';
const client = require('twilio')(accountSid, authToken);

const sendMessage = async (messageBody, number) => {
	try {
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

const recieveMessage = async (req, res) => {
	try {
		const customer = req.body;
		let ride = await Rides.find({ phone: customer.From });
		if (!ride) {
			//create
			ride = await Rides.create({ phone: customer.From });
		}
		const searchRides = () => {
			setTimeout(() => {
				return 'RIDE FOUND';
			}, 3000);
		};
		const updatedData = bookingService(ride, customer, searchRides);
		const updatedRide = await Rides.findOneAndUpdate(
			{ phone: customer.From },
			updatedData
		);
		console.log(updatedRide);
		res.status(200).json({
			message: e.states.success,
			body: { updatedRide },
		});
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
