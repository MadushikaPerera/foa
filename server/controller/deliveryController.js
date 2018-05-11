const pool = require("../utils/dbconnection");

exports.makeDelivery = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      let deliver = {
        items: req.body.items,
        user: req.body.user,
        payment: req.body.payment,
        address: req.body.address,
        contact: req.body.contact,
        totalprice: req.body.totalprice,
        employee: req.body.employee,
        vehicleno: req.body.vehicleno,
        status: req.body.status,
        ddate: req.body.ddate
      };
      conn.query("INSERT INTO deliver SET ?", deliver, function(
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
      conn.query("SELECT * FROM deliver", function(err1, records, fields) {
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
      let deliver = {
        items: req.body.items,
        user: req.body.user,
        payment: req.body.payment,
        address: req.body.address,
        contact: req.body.contact,
        totalprice: req.body.totalprice,
        employee: req.body.employee,
        vehicleno: req.body.vehicleno,
        status: req.body.status,
        ddate: req.body.ddate
      };
      conn.query(
        "UPDATE deliver SET ? WHERE did = '" + req.body.did + "' ",
        deliver,
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
        "UPDATE deliver status='false' WHERE did = '" + req.body.did + "' ",
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
