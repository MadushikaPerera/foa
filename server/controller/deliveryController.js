const pool = require("../utils/dbconnection");

exports.makeDelivery = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      let delivery = [
        {
          order: req.body.order,
          vehicleno: req.body.vehicleno,
          driverid: req.body.driverid,
          pickuptime: req.body.pickuptime,
          duration: req.body.duration,
          status: "Shipped"
        }
      ];
      conn.query("INSERT INTO delivery SET ?", delivery, function(
        err1,
        records,
        fields
      ) {
        if (!err1) {
          // do something
          res.json(records);
        }
        conn.release();
      });
    }
  });
};

exports.getDeliveries = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query("SELECT * FROM delivery", function(err1, records, fields) {
        if (!err1) {
          // do something
          res.json(records);
        }
        conn.release();
      });
    }
  });
};

exports.editDelivery = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      let delivery = [
        {
          order: req.body.order,
          vehicleno: req.body.vehicleno,
          driverid: req.body.driverid,
          pickuptime: req.body.pickuptime,
          duration: req.body.duration,
          status: req.body.status
        }
      ];
      conn.query(
        "UPDATE delivery SET ? WHERE did = '" + req.body.did + "' ",
        delivery,
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

exports.cancelDelivery = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query(
        "UPDATE delivery status='false' WHERE did = '" + req.body.did + "' ",
        function(err1, records, fields) {
          if (!err1) {
            // do something
          }
          conn.release();
        }
      );
    }
  });
};
