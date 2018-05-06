const pool = require("../utils/dbconnection");

const Promos = function(data) {
  function makePromo(connection) {
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

  function getPromos(connection) {
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

  function editPromo(connection) {
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

  function cancelPromo(connection) {
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
