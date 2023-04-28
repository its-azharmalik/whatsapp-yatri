const STAGES = {
	notStarted: 'NOT STARTED',
	booking: {
		isInitiated: 'BOOKING INITIALIZED',
		recievedText: 'TEXT RECIEVED',
	},
	startingLocation: {
		isInitiated: 'STARTING LOCATION INITIALIZED',
		recievedText: 'STARTING LOCATION RECIEVED',
	},
	destinationLocation: {
		isInitiated: 'DESTINATION LOCATION INITIALIZED',
		recievedText: 'DESTINATION LOCATION RECIEVED',
	},
	confirmLocation: {
		isInitiated: 'CONFIRM INITIALIZED',
		recievedText: 'LOCATION CONFIRMED',
	},
	searchRides: {
		isInitiated: 'RIDE SEARCH INITIALIZED',
		recievedText: 'DRIVER DATA SENT',
	},
	rideStatus: {
		rideStarted: 'OTP MATCHED',
		rideEnded: 'DRIVER ENDED THE RIDE',
	},
};

module.exports = STAGES;
