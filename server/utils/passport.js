const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const pool = require("./dbconnection");

require("dotenv").config();

// Create local strategy
const localOptions = { usernameField: "email" };
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
      console.log("error");
      res.json({ error: true });
    } else {
      conn.query(
        "select email from user where email='" + email + "' ",
        function(err1, records, fields) {
          if (err) {
            return done(err);
          }
          if (!records) {
            return done(null, false);
          }

          if (!err1) {
            // do something
            console.log(records);
            res.json(records);
          }
          conn.release();
        }
      );
    }
  });

  // User.findOne({ email: email }, function(err, user) {
  //   if (err) {
  //     return done(err);
  //   }
  //   if (!user) {
  //     return done(null, false);
  //   }

  //   // compare passwords - is `password` equal to user.password before login
  //   user.comparePassword(password, function(err, isMatch) {
  //     if (err) {
  //       return err;
  //     }
  //     if (!isMatch) {
  //       return done(null, false);
  //     }

  //     return done(null, user);
  //   });
  // });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.JWT_KEY
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the use ID in the payload exists in our database
  // If it does, call 'done' with that user
  // otherwise, call done without a user object
  // User.findById(payload.sub, function(err, user) {
  //   if (err) {
  //     return done(err, false);
  //   }
  //   if (user) {
  //     done(null, user);
  //   } else {
  //     done(null, false);
  //   }
  // });
});

// Tell passport to use this Strategy

passport.use(jwtLogin);
passport.use(localLogin);
