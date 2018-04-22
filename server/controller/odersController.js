const pool = require("../utils/dbconnection");

const Orders = function(data) {
  function makeOrder(connection) {
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
  }

  function getOrders(connection) {
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
  }

  function editOrder(connection) {
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
  }

  function cancelOrder(connection) {
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
  }
};
