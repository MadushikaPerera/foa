const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const pool = require('./dbconnection');
require('dotenv').config();

function tokenForUser(user) {
  const timpestamp = new Date().getTime();
  return jwt.encode(
    { sub: user.uname, iat: timpestamp, usr: user.email },
    process.env.JWT_KEY
  );
}

const hashPassword = function(password) {
  return new Promise(function(resolve, reject) {
    // generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        reject(err);
      }
      // hash (encrypt) our password using the sale
      bcrypt.hash(password, salt, null, function(err, hash) {
        if (err) {
          reject(err);
        }
        //overwrite plain text password with encrypted password
        resolve(hash);
      });
    });
  });
};

exports.signin = function(req, res, next) {
  // User had already had their email and pass auth'd
  //  We just need to give them a tokens
  res.send({ token: tokenForUser(JSON.parse(req.user)),user:JSON.parse(req.user).uname });
};

exports.signup = async function(req, res, next) {
  const password = await hashPassword(req.body.password);
  const fname = req.body.fname;
  const lname = req.body.lname;
  const uname = req.body.uname;
  const email = req.body.email;
  const address = req.body.address;
  const phone = req.body.phone;
  const accesslevel = req.body.access;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      // See if a user with given email exists
      conn.query(
        "SELECT uname FROM user WHERE email='" + email + "' ",
        function(err, result, fields) {
          if (err) {
            return next(err);
          }

          // If a user with email does exist, return an error
          if (result.length < 0) {
            return res.status(422).send({ error: 'Email is in use' });
          }

          // If a user email does NOT exist, create and save user record
          conn.query(
            "INSERT INTO user (fname, lname,uname,email,address,phone,accesslevel,password) VALUES ('" +
              fname +
              "', '" +
              lname +
              "','" +
              uname +
              "','" +
              email +
              "','" +
              address +
              "','" +
              phone +
              "','" +
              accesslevel +
              "','" +
              password +
              "')",
            function(err, result) {
              if (err) {
                return next(err);
              }
              // Respond to request indicating the user was created
              res.json({ token: tokenForUser({ uname, email }) });
              conn.release();
            }
          );
        }
      );
    }
  });
};
