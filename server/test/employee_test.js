const assert = require("assert");
const bcrypt = require("bcrypt-nodejs");
const pool = require("../utils/dbconnection");
const Connection = require("./test_helper");

const hashPassword = function(password) {
  console.log(password);
  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log(salt);
    // hash (encrypt) our password using the sale
    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) {
        console.log(err);
        return next(err);
      }
      console.log(hash);
      //overwrite plain text password with encrypted password
      return hash;
    });
  });
};

const comparePassword = function(candidatePassword, password, callback) {
  bcrypt.compare(candidatePassword, password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

describe("Employee tests", () => {
  xit("Add new employee", done => {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("error");
        res.json({ error: true });
      } else {
        let User = {
          fname: "",
          lname: "",
          uname: "",
          email: "",
          password: "",
          phone: "",
          address: "",
          accesslevel: ""
        };
        console.log(User);
        conn.query("INSERT INTO user SET ?", User, function(err1, records) {
          if (!err1) {
            // do something
            console.log("Number of records inserted: " + records.affectedRows);
            res.json(records);
          }
          conn.release();
        });
      }
    });
  });

  it("Hash password", done => {
    console.log(hashPassword("123asd"));
    done();
  });
});
