const STAGES = require("../config/bookingStages");
const sendMessage = require("../controllers/whatsapp.controller");
const RideData = require("../models/RideData");

const maakeNewObj = () => {
  const obj = {
    currentStage: "NOT STARTED",
    booking: {
      isInitiated: false,
      recievedText: false,
    },
    startingLocation: {
      isInitiated: false,
      recievedText: false,
    },
    destinationLocation: {
      isInitiated: false,
      recievedText: false,
    },
    confirmLocation: {
      isInitiated: false,
      recievedText: false,
    },
    searchRides: {
      isInitiated: false,
    },
    rideStatus: {
      rideStarted: false,
      rideEnded: false,
    },
  };
  return obj;
};

const bookingService = (ride, customer, searchRides, sendMessage) => {
  let updatedData = ride;
  let n = ride.rideData.length - 1;
  let stage = ride.rideData[n].currentStage;
  console.log("stage", stage);

  let updatedDataNew;

  // write a swtich case according to the curretn Stage to Update the database
  if (customer.Body == "CANCEL") {
    updatedData.rideData[n].currentStage = "RIDE CANCELLED";
    sendMessage(
      "YOUR RIDE HAS BEEN CANCELLED. THANKS FOR USING NAMMA YATRI.",
      ride.phone
    );

    return updatedData;
  }
  switch (stage) {
    case STAGES.notStarted:
      // send Initial Message - Type *BOOK* to start the Booking
      sendMessage("Type *BOOK* to start the Booking", ride.phone);
      // set booking.isInitiated to true
      updatedData.rideData[n].booking.isInitiated = true;
      //   updatedData.rideData[n].booking.isInitiated = true;
      // currentStage - 'BOOKING INITIIALIZED'
      updatedData.rideData[n].currentStage = "BOOKING INITIIALIZED";
      console.log("first");
      break;
    case STAGES.booking.isInitiated:
      if (customer.Body == "BOOK") {
        // send user - *SEND STARTING LOCATION*
        sendMessage("*SEND STARTING LOCATION*", ride.phone);
        // set booking.recievedText to true
        updatedData.rideData[n].booking.recievedText = true;
        // set startingLocation.isInitiated  to true
        updatedData.rideData[n].startingLocation.isInitiated = true;
        // currentStage - 'STARTING LOCATION INITIALIZED'
        updatedData.rideData[n].currentStage = "STARTING LOCATION INITIALIZED";
      } else {
        // send Initial Message - Sonething Wrong Type *BOOK* to start the Booking
        sendMessage(
          "Please send valid response.\n Type *BOOK* to start the Booking",
          ride.phone
        );
      }
      break;

    case STAGES.startingLocation.isInitiated:
      if (customer.Latitude && customer.Longitude) {
        // set longitude and latitude
        updatedData.rideData[n].startingLocation.longitude = customer.Longitude;
        updatedData.rideData[n].startingLocation.latitude = customer.Latitude;
        // set startingLocation.recievedText to true
        updatedData.rideData[n].startingLocation.recievedText = true;
        // currentStage - 'STARTING LOCATION RECIEVED'
        updatedData.rideData[n].currentStage = "STARTING LOCATION RECIEVED";
        sendMessage("*SEND DESTINATION LOCATION*", ride.phone);
        //
        updatedData.rideData[n].destinationLocation.isInitiated = true;

        updatedData.rideData[n].currentStage =
          "DESTINATION LOCATION INITIALIZED";
      } else {
        // send user - something wrong *PLEASE SEND STARTING LOCATION*
        sendMessage(
          "Something Wrong *PLEASE SEND STARTING LOCATION*",
          ride.phone
        );
      }
      break;

    case STAGES.destinationLocation.isInitiated:
      if (customer.Latitude && customer.Longitude) {
        // set longitude and latitude
        updatedData.rideData[n].destinationLocation.longitude =
          customer.Longitude;
        updatedData.rideData[n].destinationLocation.latitude =
          customer.Latitude;
        // set destinationLocation.recievedText to true
        updatedData.rideData[n].destinationLocation.recievedText = true;
        // currentStage - 'DESTINATION LOCATION RECIEVED'
        updatedData.rideData[n].currentStage = "DESTINATION LOCATION RECIEVED";
        sendMessage(
          "*CONFIRM YOUR RIDE \n STARTING LOCATION - _Link to check location_ \n DESTINATION LOCATION - _Link to check location_ \n FARE - 100 \n \n Type YES or NO to confirm*",
          ride.phone
        );
        updatedData.rideData[n].confirmLocation.isInitiated = true;
        updatedData.rideData[n].currentStage = "CONFIRM INITIALIZED";
      } else {
        // send user - something wrong *PLEASE SEND DESTINATION LOCATION*
        sendMessage(
          "Something Wrong *PLEASE SEND DESTINATION LOCATION*",
          ride.phone
        );
      }
      break;

    case STAGES.confirmLocation.isInitiated:
      if (customer.Body == "YES") {
        // set confirmLocation.recievedText to true
        updatedData.rideData[n].confirmLocation.recievedText = true;
        // currentStage - 'LOCATION CONFIRMED'
        updatedData.rideData[n].currentStage = "LOCATION CONFIRMED";

        // function to start search rides

        // send user - Searching For Rides / Status returned by above function
        sendMessage("Searching For Rides", ride.phone);
        // searchRides(); // write actual function here
        updatedData.rideData[n].currentStage = "RIDE SEARCH INITIALIZED";
        updatedData.rideData[n].searchRides.isInitiated = true;
        setTimeout(() => {
          sendMessage("OTP & DRIVER DETIAILS", ride.phone);
          updatedData.rideData[n].currentStage = "DRIVER DATA SENT";
        }, 3000);

        // set searchRides.isInitiated to true
        setTimeout(() => {
          sendMessage("OTP MATCHED", ride.phone);
        }, 6000);
        // currentStage - 'DRIVER DATA SENT'
        setTimeout(async () => {
          // new ride data added to users database
          updatedData.rideData[n].currentStage = "RIDE COMPLETED";
          sendMessage(
            "YOU HAVE REACHED YOUR DESTINATION, THANKS FOR RIDING WITH NAMA YATRI.",
            ride.phone
          );
        }, 9000);

        // RIDE SEARCH INITIALIZED
      } else if (customer.Body == "NO") {
        sendMessage(
          "YOUR RIDE HAS BEEN CANCELLED. THANKS FOR USING NAMMA YATRI.",
          ride.phone
        );
        // write logic to restart booking
        updatedData.rideData[n].currentStage = "RIDE CANCELLED";
      } else {
        // send user - something wrong *CONFIRM YOUR RIDE \n STARTING LOCATION - \Location Link\ \n DESTINATION LOCATION - \Location Link\ \n FARE - 100 \n \n Type YES or NO to confirm*
        sendMessage(
          "Please send valid response. \n *CONFIRM YOUR RIDE \n STARTING LOCATION - _Link to check location_ \n DESTINATION LOCATION - _Link to check location_ \n FARE - 100 \n \n Type YES or NO to confirm*",
          ride.phone
        );
      }
      break;
    default:
      // send Initial Message - Type *BOOK* to start the Booking
      sendMessage("Type *BOOK* to start the Booking d", ride.phone);
      // set booking.isInitiated to true
      updatedData.rideData[n].booking.isInitiated = true;
      // currentStage - 'BOOKING INITIALIZED'
      updatedData.rideData[n].currentStage = "BOOKING INITIALIZED";
      break;
  }

  // updated the current stage to where we've reached in the above Switch Case Statement

  // return the object of the final update
  return updatedData;
};

module.exports = bookingService;
