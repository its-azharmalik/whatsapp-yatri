const STAGES = require("../config/bookingStages");
const sendMessage = require("../controllers/whatsapp.controller");

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
  // customer : {
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
  // }

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
  // console.log('recieveMessage');

  let updatedData = ride;
  let n = ride.rideData.length - 1;
  let stage = ride.rideData[n].currentStage;
  console.log("stage", stage);

  let updatedDataNew;

  // write a swtich case according to the curretn Stage to Update the database

  switch (stage) {
    case STAGES.notStarted:
      // send Initial Message - Type *BOOK* to start the Booking
      sendMessage("Type *BOOK* to start the Booking NS", ride.phone);
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
          "Sonething Wrong Type *BOOK* to start the Booking",
          ride.phone
        );
      }
      break;
    // case STAGES.startingLocation.isInitiated:
    //   // send user - *SEND STARTING LOCATION*
    // //   sendMessage("*SEND STARTING LOCATION*", ride.phone);
    //   // set startingLocation.isInitiated  to true
    //   updatedData.rideData[n].startingLocation.isInitiated = true;
    //   // currentStage - 'STARTING LOCATION INITIALIZED'
    //   updatedData.rideData[n].currentStage = "STARTING LOCATION INITIALIZED";
    //   break;
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
    // case STAGES.startingLocation.recievedText:
    //   // send user - *SEND DESTINATION LOCATION*
    //   sendMessage("*SEND DESTINATION LOCATION*", ride.phone);
    //   // set destinationLocation.isInitiated true
    //   updatedData.rideData[n].destinationLocation.isInitiated = true;
    //   // currrentStage - 'DESTINATION LOCATION INITIALIZED'
    //   updatedData.rideData[n].currentStage = "DESTINATION LOCATION INITIALIZED";
    //   break;
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
          "*CONFIRM YOUR RIDE \n STARTING LOCATION - Location Link \n DESTINATION LOCATION - Location Link \n FARE - 100 \n \n Type YES or NO to confirm*",
          ride.phone
        );
      } else {
        // send user - something wrong *PLEASE SEND DESTINATION LOCATION*
        sendMessage(
          "Something Wrong *PLEASE SEND DESTINATION LOCATION*",
          ride.phone
        );
        updatedData.rideData[n].currentStage = "CONFIRM INITIALIZED";
        updatedData.rideData[n].confirmLocation.isInitiated = true;
      }
      break;
    // case STAGES.destinationLocation.recievedText:
    //   // send user - *CONFIRM YOUR RIDE \n STARTING LOCATION - \Location Link\ \n DESTINATION LOCATION - \Location Link\ \n FARE - 100 \n \n Type YES or NO to confirm*
    //   sendMessage(
    //     "*CONFIRM YOUR RIDE \n STARTING LOCATION - Location Link \n DESTINATION LOCATION - Location Link \n FARE - 100 \n \n Type YES or NO to confirm*",
    //     ride.phone
    //   );
    //   // set confirmLocation.isInitiated to true
    //   updatedData.rideData[n].confirmLocation.isInitiated = true;
    //   // currentStage - 'CONFIRM INITIALIZED'
    //   updatedData.rideData[n].currentStage = "CONFIRM INITIALIZED";
    //   break;
    case STAGES.confirmLocation.isInitiated:
      if (customer.Body == "YES") {
        // set confirmLocation.recievedText to true
        updatedData.rideData[n].confirmLocation.recievedText = true;
        // currentStage - 'LOCATION CONFIRMED'
        updatedData.rideData[n].currentStage = "LOCATION CONFIRMED";

        // function to start search rides

        // send user - Searching For Rides / Status returned by above function
        sendMessage(
          "Searching For Rides / Status returned by above function",
          ride.phone
        );
        searchRides(); // write actual function here

        updatedData.rideData[n].currentStage = "RIDE SEARCH INITIALIZED";
        updatedData.rideData[n].searchRides.isInitiated = true;

        // set searchRides.isInitiated to true
        sendMessage("OTP & DRIVER DETIAILS", ride.phone);

        // currentStage - 'DRIVER DATA SENT'
        updatedData.rideData[n].currentStage = "DRIVER DATA SENT";

        searchRides();
        sendMessage("OTP MATCHED", ride.phone);
        searchRides();
        sendMessage(
          "YOU HAVE REACHED YOUR DESTINATION, THANKS FOR RIDING WITH NAMA YATRI.",
          ride.phone
        );

        // RIDE SEARCH INITIALIZED
      } else if (customer.Body == "NO") {
        // write logic to restart booking
        updatedData.rideData[n].currentStage = "BOOKING CANCELLED";
        updatedData.rideData.push(maakeNewObj());
      } else {
        // send user - something wrong *CONFIRM YOUR RIDE \n STARTING LOCATION - \Location Link\ \n DESTINATION LOCATION - \Location Link\ \n FARE - 100 \n \n Type YES or NO to confirm*
        sendMessage(
          "Something Wrong *CONFIRM YOUR RIDE \n STARTING LOCATION - Location Link \n DESTINATION LOCATION - Location Link \n FARE - 100 \n \n Type YES or NO to confirm*",
          ride.phone
        );

        sendMessage("WANT TO BOOK A NEW RIDE", ride.phone);
        // make a new obj and push in the array
        updatedData.rideData.push(maakeNewObj());
        // send Initial Message - Type *BOOK* to start the Booking
        sendMessage("Type *BOOK* to start the Booking", ride.phone);
        // set booking.isInitiated to true
        updatedData.rideData[rideData.length - 1].booking.isInitiated = true;
        // currentStage - 'BOOKING INITIALIZED'
        updatedData.rideData[n].currentStage = "BOOKING INITIALIZED";
      }
      break;
    // case STAGES.confirmLocation.recievedText:
    //   // function to start search rides or get back the status
    //   //

    //   // send user - Searching For Rides / Status returned by above function
    //   sendMessage(
    //     "Searching For Rides / Status returned by above function",
    //     ride.phone
    //   );
    //   // currentStage - RIDE SEARCH INITIALIZED
    //   updatedData.rideData[n].currentStage = "RIDE SEARCH INITIALIZED";
    //   break;
    // case STAGES.searchRides.isInitiated:
    //   // function to start search rides or get back the status
    //   searchRides(); // write actual function here
    //   // in this function we write
    //   // if ridefound then update the driver details and otp
    //   // on the driver's side if he enters the otp send user - otp matched & start the ride

    //   // if( status == ride found ) {
    //   // SET OTP & SEND DRIVER DETIAILS
    //   //
    //   sendMessage("SET OTP & SEND DRIVER DETIAILS", ride.phone);

    //   // currentStage - 'DRIVER DATA SENT'
    //   updatedData.rideData[n].currentStage = "DRIVER DATA SENT";
    //   //}
    //   // else send user - Searching For Rides / Status returned by above function
    //   sendMessage(
    //     "Searching For Rides / Status returned by above function",
    //     ride.phone
    //   );

    //   // currentStage - DRIVER DATA SENT
    //   updatedData.rideData[n].currentStage = "DRIVER DATA SENT";
    //   break;
    // case STAGES.searchRides.recievedText:
    //   // send driver details again
    //   sendMessage("OTP & DRIVER DETIAILS", ride.phone);
    //   break;
    // case STAGES.rideStatus.rideStarted:
    //   // currentStage - OTP MATCHED
    //   sendMessage("OTP MATCHED", ride.phone);
    //   updatedData.rideData[n].currentStage = "OTP MATCHED";
    //   // when driver ends the ride set the stage currentStage - DRIVER ENDED THE RIDE
    //   sendMessage("DRIVER ENDED THE RIDE", ride.phone);
    //   updatedData.rideData[n].currentStage = "DRIVER ENDED THE RIDE";
    //   break;
    // case STAGES.rideStatus.rideEnded:
    //   // send - WANT TO BOOK A NEW RIDE
    //   sendMessage("WANT TO BOOK A NEW RIDE", ride.phone);
    //   // make a new obj and push in the array
    //   updatedData.rideData.push(maakeNewObj());
    //   // send Initial Message - Type *BOOK* to start the Booking
    //   sendMessage("Type *BOOK* to start the Booking", ride.phone);
    //   // set booking.isInitiated to true
    //   updatedData.rideData[rideData.length - 1].booking.isInitiated = true;
    //   // currentStage - 'BOOKING INITIALIZED'
    //   updatedData.rideData[n].currentStage = "BOOKING INITIALIZED";
    //   break;
    default:
      // send Initial Message - Type *BOOK* to start the Booking
      sendMessage("Type *BOOK* to start the Booking ---", ride.phone);
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
