const { default: mongoose, Mongoose } = require("mongoose");
const RideData = require("./RidesData");
const e = require("../config/errorList");

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "RideData",
      required: true,
    },
  ],
});

const Rides = mongoose.model("Rides", userSchema);

module.exports = Rides;
