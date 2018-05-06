const pool = require("../utils/dbconnection");

exports.getUser = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("error");
      res.json({ error: true });
    } else {
      conn.query("select * from user", function(err1, records, fields) {
        if (!err1) {
          // do something
          res.json(records);
        }
        conn.release();
      });
    }
  });
};

exports.makeOrder = function(req, res, next) {
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

exports.getOrders = function() {
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

exports.editOrder = function() {
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

exports.cancelOrder = function() {
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
