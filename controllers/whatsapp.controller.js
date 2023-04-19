const { e } = require("../config");
const { User } = require("../models");
const Rides = require("../models/Rides");
// const { imageUploaderSingle } = require("../services");
const bookingService = require("../services/booking.services");
const accountSid = "ACa1d7033540820f01d6206b37bf6dcdc3";
const authToken = "2c773a745057532ae195872d96ecf1e8";
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
    // let ride = await Rides.find({ phone: customer.From });
    // if (!ride) {
    //   //create
    //   ride = await Rides.create({ phone: customer.From });
    // }

    const ride = await Rides.findOneAndUpdate(
      { phone: customer.From },
      {},
      { new: true }
    );
    console.log(ride);
    const searchRides = () => {
      setTimeout(() => {
        return "RIDE FOUND";
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
