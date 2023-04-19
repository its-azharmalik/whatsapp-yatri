const { default: mongoose, Mongoose } = require('mongoose');

const e = require('../config/errorList');

const validateEmail = (email) => {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const userSchema = new mongoose.Schema({
	phone: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	ridesData: [
		{
			// timestamps: {
			// 	cat,
			// 	uat,
			// 	lastSeen,
			// },
			currentStage: {
				type: String,
				default: 'NOT STARTED',
				required: true,
			},
			booking: {
				isInitiated: {
					type: Boolean,
					default: false,
					required: true,
				},
				recievedText: {
					type: Boolean,
					default: false,
					required: true,
				},
			},
			startingLocation: {
				longitude: {
					type: String,
					trim: true,
				},
				longitude: {
					type: String,
					trim: true,
				},
				isInitiated: {
					type: Boolean,
					default: false,
					required: true,
				},
				recievedText: {
					type: Boolean,
					default: false,
					required: true,
				},
			},
			destinationLocation: {
				longitude: {
					type: String,
					trim: true,
				},
				longitude: {
					type: String,
					trim: true,
				},
				isInitiated: {
					type: Boolean,
					default: false,
					required: true,
				},
				recievedText: {
					type: Boolean,
					default: false,
					required: true,
				},
			},
			confirmLocation: {
				isInitiated: {
					type: Boolean,
					default: false,
					required: true,
				},
				recievedText: {
					type: Boolean,
					default: false,
					required: true,
				},
				startLocationLink: {
					type: String,
					trim: true,
				},
				endLocationLink: {
					type: String,
					trim: true,
				},
			},
			searchRides: {
				isInitiated: {
					type: Boolean,
					default: false,
					required: true,
				},
				driverDetails: [{ type: Schema.Types.ObjectId, ref: 'User' }],
				otp: {
					type: String,
					trim: true,
				},
			},
			rideStatus: {
				rideStarted: {
					type: Boolean,
					default: false,
					required: true,
				},
				rideEnded: {
					type: Boolean,
					default: false,
					required: true,
				},
			},
		},
	],
});

const Rides = mongoose.model('Rides', userSchema);

module.exports = Rides;
