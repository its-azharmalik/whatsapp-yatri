const express = require('express');
const { tokenVerification, upload } = require('../config');
const { getUserDetails, updateUserDetails } = require('../controllers/user.controller');

const router = express.Router();

router.get('/', tokenVerification, getUserDetails);
router.put('/', tokenVerification, upload.single('url'), updateUserDetails);

module.exports = router;