const pool = require("../utils/dbconnection");

exports.addToCart = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      let cart = {
        item: req.body.item,
        quantity: req.body.quantity,
        price: req.body.price,
        user: req.body.user,
        status: req.body.status,
        dob: req.body.dob
      };
      conn.query("INSERT INTO cart SET ?", cart, function(
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

exports.getCartItems = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      //and status='checkout'
      conn.query(
        "SELECT * FROM cart WHERE active='true' and status='pending' and user='" +
          req.query.uname +
          "'  ",
        function(err1, records, fields) {
          if (!err1) {
            // do something
            console.log(records);

            res.json(records);
          }
          conn.release();
        }
      );
    }
  });
};

exports.editCartItem = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      let cart = {
        item: req.body.item,
        quantity: req.body.quantity,
        price: req.body.price,
        user: req.body.user,
        status: req.body.status,
        dob: req.body.dob
      };
      conn.query(
        "UPDATE cart SET ? WHERE cid = '" + req.body.cid + "' ",
        cart,
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

exports.cancelCartItem = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query(
        "UPDATE cart active='false' WHERE cid = '" + req.body.cid + "' ",
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

exports.chekoutCartItems = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      let cartids = [];
      req.body.cids.map(id => cartids.push({ cid: id.cid }));
      console.log(cartids);

      conn.query(
        "UPDATE cart SET status='checkedout' WHERE cid ? ",
        cartids,
        function(err1, records, fields) {
          console.log("checking out", err1);

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
