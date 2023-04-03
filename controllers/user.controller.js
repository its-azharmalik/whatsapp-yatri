const { e } = require("../config");
const { User } = require("../models");
const { imageUploaderSingle } = require("../services");

const getUserDetails = async (req,res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        res.status(200).json({
            message: e.states.success,
            body: {
                ...user._doc
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const updateUserDetails = async (req,res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        const { phone, username, url } = req.body;
        if (req.file) {
            user.avatar = await imageUploaderSingle(req.file.path);
        } else if (url === 'NULL') {
            user.avatar = '';
        }
        if (phone) {
            user.phone = phone;
        }
        if (username) {
            user.username = username;
        }
        await user.save();
        res.status(200).json({
            message: e.states.success,
            body: { ... user._doc }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    getUserDetails,
    updateUserDetails
}