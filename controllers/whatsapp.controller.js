const { e } = require("../config");
const { User } = require("../models");
const Rides = require("../models/Rides");
const RideData = require("../models/RideData");
// const { imageUploaderSingle } = require("../services");
const bookingService = require("../services/booking.services");
const accountSid = "ACa1d7033540820f01d6206b37bf6dcdc3";
const authToken = "831f03f627e53c506ce3617246b987d1";
const client = require("twilio")(accountSid, authToken);

const sendMessage = async (messageBody, number) => {
  try {
    client.messages
      .create({
        body: messageBody,
        from: "whatsapp:+14155238886",
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
    if (ride.length == 0) {
      //create
      //deploy
      const rideData = await RideData.create({ currentStage: "NOT STARTED" });
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

    if (
      ride.rideData[ride.rideData.length - 1].currentStage ==
        "RIDE COMPLETED" ||
      ride.rideData[ride.rideData.length - 1].currentStage == "RIDE CANCELLED"
    ) {
      const rideData = await RideData.create({ currentStage: "NOT STARTED" });
      const arr = ride.rideData;
      console.log(rideData);
      arr.push(rideData._id);
      ride = await Rides.findByIdAndUpdate(
        { _id: ride._id },
        {
          $set: {
            rideData: arr,
          },
        },
        { new: true }
      );
    }
    const searchRides = () => {
      setTimeout(() => {
        return "RIDE FOUND";
      }, 3000);
    };

    const updatedData = bookingService(
      ride,
      customer,
      searchRides,
      sendMessage
    );
    const data = updatedData.rideData[updatedData.rideData.length - 1];
    const id = data.id;
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
    // console.log("updatedRide", updatedRide);
    res.status(200).json({
      message: e.states.success,
      body: { updatedRide, ride },
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
