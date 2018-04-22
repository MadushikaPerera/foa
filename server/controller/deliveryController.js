const pool = require("../utils/dbconnection");

exports.makeDelivery = function(req, res, next) {
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

exports.getDeliveries = function(req, res, next) {
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

exports.editDelivery = function(req, res, next) {
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

exports.cancelDelivery = function(req, res, next) {
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
