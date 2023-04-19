const { default: mongoose, Mongoose } = require("mongoose");

const rideSchema = new mongoose.Schema({
  currentStage: {
    type: String,
    default: "NOT STARTED",
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
    driverDetails: {
      type: String,
      trim: true,
    },
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
});

const RideData = mongoose.model("RidesData", rideSchema);

module.exports = RideData;
