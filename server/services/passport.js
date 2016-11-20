const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localLogin = new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  // Verify this username and password, call done with the user
  // if it is the correct username and password
  // otherwise call done with false

  User.findOne({ email: email }, (err, user) => {

    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    // compare passwords - is 'password' equal to user.password
    user.comparePassword(password, (err, isMatch) => {

      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, user);
      }

      return done(null, user);

    });

  });

});

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.SECRET
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our database
  // if it does, call done with that other
  // otherwise, call done without a user object

  User.findById(payload.sub, (err, user) => {

    if (err) {
      return done(err, false);
    }

    user ? done(null, user) : done(null, false);

  });

});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);