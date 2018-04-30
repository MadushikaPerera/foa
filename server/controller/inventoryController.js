

const pool = require("../utils/dbconnection");

exports.addInventoryFoodItem = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      let foodItem = {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
      };
      conn.query("INSERT INTO meal SET ?",foodItem,function(err1, records, fields) {
        if (!err1) {
          res.send(true);
        }
        else{
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
      let vehicle = {
        licenseno: req.body.licenseno,
        brand: req.body.brand,
        model: req.body.model,
        dob: req.body.dob,
        quantity: req.body.quantity
      };
      conn.query("INSERT INTO vehicle SET ?",vehicle,function(err1, records, fields) {
        if (!err1) {
          res.send(true);
        }
        else{
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
      conn.query("SELECT * FROM meal", function(err1, records, fields) {
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
      conn.query("SELECT * FROM vehicle", function(err1, records, fields) {
        if (!err1) {
          res.json(records);
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

exports.cancelInventoryItem = function(req, res, next) {
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
