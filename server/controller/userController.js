const bcrypt = require("bcrypt-nodejs");
const pool = require("../utils/dbconnection");
const multer = require("multer"); //FOR FILE UPLOAD
const storage = multer.diskStorage({
  //multers disk storage settings
  destination: function(req, file, cb) {
    cb(null, "./public/uploads"); //image storage path
  },
  filename: function(req, file, cb) {
    const datetimestamp = Date.now();
    cb(null, file.originalname);
  }
});
const upload = multer({
  //multer settings
  storage: storage
}).single("file");

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
      if (req.file) {
        upload(req, res, function(err) {
          if (err) {
            // An error occurred when uploading
            return res.status(422).send("an Error occured");
          }
          // No error occured.
          path = req.file.path;
          return res.status(200).send(path);
        });
      }
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
        phone: req.body.phone,
        address: req.body.address
      };
      console.log(User);

      conn.query(
        "UPDATE user SET ? WHERE uname = '" + req.body.uname + "' ",
        User,
        function(err1, records) {
          if (err1) {
            res.json(false);
          } else {
            console.log(records);
            res.json(true);
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

exports.getUser = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("error");
      res.json({ error: true });
    } else {
      conn.query(
        "SELECT fname,lname,phone,address FROM user WHERE uname = '" +
          req.query.uname +
          "' ",
        function(err1, records) {
          if (!err1) {
            res.json(records);
          }
          conn.release();
        }
      );
    }
  });
};
