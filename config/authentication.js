const { User } = require('../models');
const e = require("./errorList");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const NON_VERIFIED_PATHS = ['/login', '/verify'];

const authentication = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            res.status(500).json({
                error: e.email.invalidEmail
            });
        }else{
            if(await bcrypt.compare(password , user.password) ){
                req.user = user;
                next();
            }else {
                res.status(404).json({
                    error: e.users.invalidUserCredentials
                });
            }    
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const tokenVerification = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1] || req.headers.cookie.split('=')[1];
        if(!token){
            res.status(500).json({
                error: e.login.invalidToken
            });
        }else {
            jwt.verify(token, process.env.JWT_ACCESS_TOKEN, async (error, user) => {
                if(error){
                    res.status(500).json({
                        error: error.message
                    })
                }else{
                    req.user = user;
                    if(NON_VERIFIED_PATHS.find(path => path === req.route.path) || req.user.verified){
                        next();
                    }else {
                        res.status(500).json({
                            error: e.verification.notVerifiedEmail
                        });
                    }
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = { authentication, tokenVerification };