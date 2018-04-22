const pool = require("../utils/dbconnection");

exports.addInventoryItem = function(req, res, next) {
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

exports.getInventoryItems = function(req, res, next) {
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
