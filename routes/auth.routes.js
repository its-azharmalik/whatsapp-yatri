const express = require('express');
const passport = require('passport');

const { signup, login, logout } = require('../controllers/auth.controller');
const { authentication, tokenVerification } = require('../config');
require('../config/passport');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', authentication, login);
router.get('/logout', tokenVerification, logout);


//Google OAuth
router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}));
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/failed' }), (req,res) => {
    const authToken = req.headers['authorization'].split(' ')[1];
    res.cookie('token', authToken, {
        maxAge: 60 * 60 * 10
    });
    res.redirect('/home');
});

module.exports = router;