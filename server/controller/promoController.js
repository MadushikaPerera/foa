const pool = require("../utils/dbconnection");

exports.addPromos = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      let promo = {
        name: req.body.name,
        description: req.body.description,
        rate: req.body.rate,
        startdate: req.body.startdate,
        enddate: req.body.enddate
      };
      conn.query("INSERT INTO promotion SET ?", promo, function(
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

exports.getPromos = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query(
        "SELECT * FROM promotion WHERE active='true' ORDER BY RAND() LIMIT 3",
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

exports.editPromo = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      let promo = {
        name: req.body.name,
        description: req.body.description,
        rate: req.body.rate,
        startdate: req.body.startdate,
        enddate: req.body.enddate
      };
      conn.query(
        "UPDATE promotion SET ? WHERE pid= '" + req.body.pid + "' ",
        promo,
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

exports.cancelPromo = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query(
        "UPDATE promotion SET active='false' WHERE pid= '" +
          req.body.pid +
          "' ",
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
