const colors = require('colors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const e = require("../config/errorList");
const { User } = require("../models");
const { emailService, imageUploaderSingle } = require("../services");

const verifyEmail = async (req,res) => {
    try {
        // const jwtToken = jwt.sign( req.user.email , process.env.JWT_ACCESS_TOKEN );
        const jwtToken = jwt.sign({ email: req.user.email }, process.env.JWT_ACCESS_TOKEN, { expiresIn : '604800' });
        const type_of_action = e.email.verifyEmail;
        const action_description = e.email.verifyEmailActionDescription;
        const url = process.env.DOMAIN + '/api/services/verifywithjwt?jwt=' + jwtToken ;
        const { username, email } = req.user;
        const response = await emailService(type_of_action, url, username, email, action_description);
        if(response.err != "NULL"){
            res.status(500).json({
                error: response.err
            });
        } else {
            response.acceptedMail.map((mail) => console.log(`Mail sent to ${`${mail}`.bold.green} for action "${type_of_action}"`));
            res.status(200).json({
                message: `Succesfully sent mail for '${type_of_action}' to ${response.acceptedMail[0]}`
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};

const verifyEmailWithJwtToken = async (req,res) => {
    try {
        const jwtToken = req.query.jwt;
        jwt.verify(jwtToken, process.env.JWT_ACCESS_TOKEN , async (err, data) => {
            if(err){
                res.status(500).json({
                    error: err.message
                })
            }else{
                const date = new Date().getTime()/1000;
                if(data.exp < date){
                    res.status(500).json({
                        message: e.expiration.tokenExpired
                    })
                    return;
                }
                const user = await User.findOne({ email: data.email });
                const { verified, phone } = req.body;
                if(verified){
                    user.verified = true;
                }
                if(phone){
                    user.phone = phone;
                }
                if(req.file){
                    user.avatar = await imageUploaderSingle(req.file.path);
                }
                await user.save();
                res.status(200).json({
                    message: "User verified successfully and the details are being updated. Happy surfing !",
                    body: user
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};

const resetPasswordRequest = async (req,res) => {
    try {
        const { username, email } = req.user;
        const jwtToken = jwt.sign({ email }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '604800' }); 
        const type_of_action = e.login.resetPassword;
        const action_description = e.login.resetPasswordActionDescription;
        const url = process.env.DOMAIN + '/api/services/resetpassword?jwt=' + jwtToken ;
        const response = await emailService(type_of_action, url, username, email, action_description);
        if(response.err != "NULL"){
            res.status(500).json({
                error: response.err
            });
        } else {
            response.acceptedMail.map((mail) => console.log(`Mail sent to ${`${mail}`.bold.green} for action "${type_of_action}"`));
            res.status(200).json({
                message: `Succesfully sent mail for '${type_of_action}' to ${response.acceptedMail[0]}`
            })
        };
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const resetPassword = async (req,res) => {
    try {
        const jwtToken = req.query.jwt;
        jwt.verify( jwtToken, process.env.JWT_ACCESS_TOKEN, async (err, data) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            const date = new Date().getTime()/1000;
            if (date > data.exp) {
                res.status(500).json({
                    message: e.expiration.tokenExpired
                });
                return;
            } else {
                const user = await User.findOne({ email: data.email });
                let { oldPassword, newPassword } = req.body;
                if(oldPassword === newPassword){
                    res.status(500).json({
                        message: e.login.oldNewPassword
                    });
                    return;
                }
                if(await bcrypt.compare(oldPassword, user.password) ){
                    user.password = await bcrypt.hash(newPassword, 10);
                    await user.save(); 
                    res.status(200).json({
                        message: e.login.passwordChangedSuccess,
                        body: user._doc
                    });
                } else {
                    res.status(500).json({
                        message: e.login.invalidOldPassword
                    });
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};

const forgotPassword = async (req,res) => {
    try {
        const { username, email } = req.body ;
        const jwtToken = jwt.sign({ email }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '604800' }); 
        const type_of_action = e.login.forgotPassword;
        const action_description = e.login.resetPasswordActionDescription;
        const url = process.env.DOMAIN + '/api/services/resetpassword?jwt=' + jwtToken ;
        const response = await emailService(type_of_action, url, username, email, action_description);
        if(response.err != "NULL"){
            res.status(500).json({
                error: response.err
            });
        } else {
            response.acceptedMail.map((mail) => console.log(`Mail sent to ${`${mail}`.bold.green} for action "${type_of_action}"`));
            res.status(200).json({
                message: `Succesfully sent mail for '${type_of_action}' to ${response.acceptedMail[0]}`
            })
        };
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const changePassword = async (req,res) => {
    try {
        const jwtToken = req.query.jwt;
        jwt.verify( jwtToken, process.env.JWT_ACCESS_TOKEN, async (err, data) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            const date = new Date().getTime()/1000;
            if (date > data.exp) {
                res.status(500).json({
                    message: e.expiration.tokenExpired
                });
                return;
            } else {
                const user = await User.findOne({ email: data.email });
                let { password } = req.body;
                user.password = await bcrypt.hash(password, 10);
                await user.save(); 
                res.status(200).json({
                    message: e.login.passwordChangedSuccess,
                    body: user._doc
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};

module.exports = {
    verifyEmail,
    forgotPassword,
    verifyEmailWithJwtToken,
    resetPassword,
    changePassword,
    resetPasswordRequest,
}