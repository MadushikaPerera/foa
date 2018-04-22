const bcrypt = require("bcrypt-nodejs");
const pool = require("../utils/dbconnection");

// compare passwords is equal to user's password
exports.comparePassword = function(candidatePassword, password, callback) {
  bcrypt.compare(candidatePassword, password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

const hashPassword = function(password) {
  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash (encrypt) our password using the sale
    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      //overwrite plain text password with encrypted password
      return hash;
    });
  });
};

exports.addUser = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("error");
      res.json({ error: true });
    } else {
      let User = {
        fname: req.body.fname,
        lname: req.body.lname,
        uname: req.body.uname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        accesslevel: req.body.accesslevel
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
};

exports.updateUser = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("error");
      res.json({ error: true });
    } else {
      let User = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        accesslevel: req.body.accesslevel
      };
      conn.query(
        "UPDATE user SET ? WHERE uname = '" + req.body.uname + "' ",
        User,
        function(err1, records) {
          if (!err1) {
            // do something
            console.log("Number of records inserted: " + records.affectedRows);
            res.json(records);
          }
          conn.release();
        }
      );
    }
  });
};

exports.deleteUser = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("error");
      res.json({ error: true });
    } else {
      conn.query(
        "UPDATE user SET active='false' WHERE uname = '" +
          req.body.uname +
          "' ",
        User,
        function(err1, records) {
          if (!err1) {
            // do something
            console.log("Number of records inserted: " + records.affectedRows);
            res.json(records);
          }
          conn.release();
        }
      );
    }
  });
};
