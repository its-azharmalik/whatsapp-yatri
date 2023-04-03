const { default: mongoose } = require("mongoose");

const e = require('../config/errorList');


const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: e.email.emailAddressRequired,
        validate: [validateEmail, e.email.invalidEmail],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            e.email.invalidEmail,
        ],
    },
    password: {
        type:String,
        required: true,
        trim: true
    },
    avatar: {
        type:String,
        trim: true

    },
    phone: {
        type: Number,
        trim: true

    },
    verified: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;