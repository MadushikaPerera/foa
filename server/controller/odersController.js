const pool = require("../utils/dbconnection");

exports.makeOrder = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log(err);
    } else {
      let order = {
        totalprice: 100,
        user: "madu",
        address: "asasasa",
        contact: "23232323",
        payment: "cash",
        dob: "34323",
        status: "pending"
      };
      conn.query(
        "INSERT INTO `order` (`totalprice`,`user`,`address`,`contact`,`payment`,`dob`,`status`) VALUES('" +
          parseInt(order.totalprice) +
          "','" +
          order.user +
          "','" +
          order.address.toString() +
          "','" +
          order.contact +
          "','" +
          order.payment +
          "','" +
          order.dob.toString() +
          "','" +
          order.status +
          "') ",
        function(err1, records, fields) {
          if (!err1) {
            // do something
            let orderitem = req.body.items;
            orderitem.map(item => (item.oid = records.insertId));
            conn.query("INSERT INTO `orderitem` SET ?", orderitem, function(
              err2,
              records,
              fields
            ) {
              if (!err2) {
                // do something
                console.log(err2);

                res.json(records);
              }
              console.log(err1);
              conn.release();
            });

            //res.json(records);
          }
          console.log(err1);
          //conn.release();
        }
      );
    }
  });
};

exports.getOrders = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query("SELECT * FROM order WHERE active='true'", function(
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

exports.editOrder = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      let order = {
        items: req.body.items,
        totalprice: req.body.totalprice,
        user: req.body.user,
        address: req.body.address,
        contact: req.body.contact,
        payment: req.body.payment,
        dob: req.body.dob,
        status: req.body.status
      };
      conn.query(
        "UPDATE order SET ? WHERE oid= '" + req.body.oid + "' ",
        order,
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

exports.cancelOrder = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query(
        "UPDATE order SET active='false' WHERE oid= '" + req.body.oid + "' ",
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
