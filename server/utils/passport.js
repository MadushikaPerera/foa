const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const pool = require("./dbconnection");
const bcrypt = require("bcrypt-nodejs");

require("dotenv").config();

const comparePassword = function(candidatePassword, password) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(candidatePassword, password, function(err, isMatch) {
      if (err) {
        reject(false);
      }
      if (!isMatch) {
        reject(false);
      }
      resolve(true);
    });
  });
};

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
        "select email,password,uname,fname,accesslevel from user where email='" +
          email +
          "' ",
        async function(err1, records) {
          try {
            if (err1) {
              return done(err);
            }
            if (records.legth < 0) {
              return done(null, false);
            }

            let isPassword = await comparePassword(
              password,
              records[0].password
            );
            // compare passwords - is `password` equal to user.password before login
            if (isPassword) {
              return done(null, JSON.stringify(records[0]));
            } else {
              return done(null, false);
            }
            conn.release();
          } catch (err) {
            return done(err);
          }
        }
      );
    }
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.JWT_KEY
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the use uname in the payload exists in our database
  // If it does, call 'done' with that user
  // otherwise, call done without a user object
  pool.getConnection(function(err, conn) {
    if (err) {
      res.json({ error: true });
    } else {
      conn.query(
        "select * from user where uname='" + payload.sub + "' ",
        function(err1, records, fields) {
          if (err1) {
            done(err, false);
          }

          if (JSON.stringify(records[0]).length > 0) {
            let user = JSON.parse(JSON.stringify(records[0]));
            done(null, user);
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
