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

exports.addInventoryFoodItem = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
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
      let foodItem = {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
      };
      conn.query("INSERT INTO meal SET ?", foodItem, function(
        err1,
        records,
        fields
      ) {
        if (!err1) {
          res.send(true);
        } else {
          console.log(err1);
        }
        conn.release();
      });
    }
  });
};

exports.addInventoryVehicle = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
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
      let vehicle = {
        licenseno: req.body.licenseno,
        brand: req.body.brand,
        model: req.body.model,
        dob: req.body.dob,
        quantity: req.body.quantity
      };
      conn.query("INSERT INTO vehicle SET ?", vehicle, function(
        err1,
        records,
        fields
      ) {
        if (!err1) {
          res.send(true);
        } else {
          console.log(err1);
        }
        conn.release();
      });
    }
  });
};

exports.getInventoryFoodItems = function(req, res) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query("SELECT * FROM meal WHERE active='true'", function(
        err1,
        records,
        fields
      ) {
        if (!err1) {
          res.json(records);
        }
        conn.release();
      });
    }
  });
};

exports.getInventoryVehicleItems = function(req, res) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query("SELECT * FROM vehicle WHERE active='true'", function(
        err1,
        records,
        fields
      ) {
        if (!err1) {
          res.json(records);
        }
        conn.release();
      });
    }
  });
};

exports.editFoodItem = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query(
        "UPDATE meal SET ? WHERE mid= '" + req.body.mid + "' ",
        {
          name: req.body.name,
          type: req.body.type,
          price: req.body.price,
          quantity: req.body.quantity,
          description: req.body.description
        },
        function(err1, records, fields) {
          if (!err1) {
            // do something
            res.json(records);
          }
          conn.release();
        }
      );
    }
  });
};

exports.deleteFoodItem = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query(
        "UPDATE meal SET active='false' WHERE mid= '" + req.body.mid + "' ",
        function(err1, records, fields) {
          if (!err1) {
            // do something
            res.json(records);
          }
          conn.release();
        }
      );
    }
  });
};

exports.editVehicleItems = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query("", function(err1, records, fields) {
        if (!err1) {
          // do something
        }
        conn.release();
      });
    }
  });
};

exports.editInventoryItem = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query("", function(err1, records, fields) {
        if (!err1) {
          // do something
        }
        conn.release();
      });
    }
  });
};
