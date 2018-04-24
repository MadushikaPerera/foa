const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const pool = require('./dbconnection');
const bcrypt = require('bcrypt-nodejs');

require('dotenv').config();

const comparePassword = function(candidatePassword, password) {
  bcrypt.compare(candidatePassword, password, function(err, isMatch) {
    if (err) {
      return false;
    }
    if (!isMatch) {
      return false;
    }
    return true;
  });
};

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  // Verify this username and password, call done with the user
  // if it is the correct username and password
  // otherwise, call done with false
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log('error');
      res.json({ error: true });
    } else {
      conn.query(
        "select email,password from user where email='" + email + "' ",
        function(err1, records, fields) {
          if (err1) {
            return done(err);
          }
          if (!records) {
            return done(null, false);
          }
          // compare passwords - is `password` equal to user.password before login
          if (comparePassword(password, JSON.stringify(records[0].password))) {
            return done(null, JSON.stringify(records[0]));
          } else {
            return done(null, false);
          }
          conn.release();
        }
      );
    }
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_KEY
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the use ID in the payload exists in our database
  // If it does, call 'done' with that user
  // otherwise, call done without a user object
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log('error');
      res.json({ error: true });
    } else {
      conn.query(
        "select * from user where uname='" + payload.sub + "' ",
        function(err1, records, fields) {
          if (err1) {
            return done(err, false);
          }

          if (records) {
            done(null, JSON.stringify(records));
          } else {
            done(null, false);
          }

          conn.release();
        }
      );
    }
  });
});

// Tell passport to use this Strategy

passport.use(jwtLogin);
passport.use(localLogin);
