const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models');
const passwordGenerator = require('./randomPassword');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CREDENTIAL_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CREDENTIAL_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CREDENTIAL_CALLBACK_URL,
    passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, done) => {
    const { email } = profile._json;
    let user = await User.findOne({ email });
    if ( !user ) {
        const { name: username, email_verified: verified, picture: avatar } = profile._json;
        let password = passwordGenerator(10);
        password = await bcrypt.hash(password, 10);
        user = await User.create({
            username,
            verified,
            avatar,
            password,
            email
        });
    }
    const token = jwt.sign( user.toJSON(), process.env.JWT_ACCESS_TOKEN );
    req.headers["authorization"] = `Bearer ${token}`;
    return done(null, user);
}
));