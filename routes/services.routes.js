const express = require('express');

const { tokenVerification, upload } = require('../config');
const { verifyEmail, verifyEmailWithJwtToken, forgotPassword, resetPassword, changePassword, resetPasswordRequest } = require('../controllers/services.controller');

const router = express.Router();

router.get('/verify', tokenVerification, verifyEmail);
router.post('/verifywithjwt', upload.single('url'), verifyEmailWithJwtToken);


//when user wants to change the password and he still remembers the old password and can log in
router.get('/requestresetpassword', tokenVerification, resetPasswordRequest);
router.put('/resetpassword', resetPassword);


//when user wants to change the password cuz he forgot his old password
router.get('/forgotpassword', forgotPassword);
router.put('/changepassword', changePassword);

module.exports = router;