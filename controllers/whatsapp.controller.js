const { e } = require('../config');
const { User } = require('../models');
const Rides = require('../models/Rides');
const RideData = require('../models/RideData');
// const { imageUploaderSingle } = require("../services");
const bookingService = require('../services/booking.services');
const accountSid = 'ACa1d7033540820f01d6206b37bf6dcdc3';
const authToken = '2c773a745057532ae195872d96ecf1e8';
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
		console.log('customer', customer);
		let ride = await Rides.find({ phone: customer.From });
		if (ride.length == 0) {
			//create
			const rideData = await RideData.create({ currentStage: 'NOT STARTED' });
			ride = await Rides.create({ phone: customer.From });
			ride = await Rides.findByIdAndUpdate(ride._id, {
				rideData: [rideData._id],
			});
		}

		ride = await Rides.findOneAndUpdate(
			{ phone: customer.From },
			{},
			{ new: true }
		);
		const searchRides = () => {
			setTimeout(() => {
				return 'RIDE FOUND';
			}, 3000);
		};
		const updatedData = bookingService(
			ride,
			customer,
			searchRides,
			(message, phone) => {
				console.log('from', phone);
				console.log('message', message);
			}
		);
		const data = updatedData.rideData[updatedData.rideData.length - 1];
		const id = data.id;
		console.log('id', id);
		console.log('data', data);
		const updatedRide = await RideData.findByIdAndUpdate(
			{ _id: id },
			{
				$set: {
					currentStage: data.currentStage,
					booking: data.booking,
					startingLocation: data.startingLocation,
					destinationLocation: data.destinationLocation,
					confirmLocation: data.confirmLocation,
					searchRides: data.searchRides,
					rideStatus: data.rideStatus,
				},
			},
			{ new: true }
			// updatedData.rideData[updatedData.rideData.length - 1]._id,
			// {
			// 	currentStage:
			// 		updatedData.rideData[updatedData.rideData.length - 1].currentStage,
			// },
			// updatedData.rideData[updatedData.rideData.length - 1]
		);
		console.log('updatedRide', updatedRide);
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
