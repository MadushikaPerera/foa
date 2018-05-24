const pool = require("../utils/dbconnection");

exports.getEmployee = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("error");
      res.json({ error: true });
    } else {
      conn.query("select * from employee where active='true' ", function(
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

exports.addEmployee = function(req, res, next) {
  console.log("adding employee");

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log(err);
    } else {
      let employee = {
        fname: req.body.fname,
        lname: req.body.lname,
        nic: req.body.nic,
        address: req.body.address,
        contact: req.body.contact,
        type: req.body.type,
        license: req.body.license,
        dob: req.body.dob
      };
      console.log(employee);

      conn.query("INSERT INTO employee SET ?", employee, function(
        err1,
        records,
        fields
      ) {
        console.log(err1);
        if (!err1) {
          // do something

          console.log(records);

          res.json(records);
        }
        conn.release();
      });
    }
  });
};

exports.editEmployee = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      let employee = {
        fname: req.body.fname,
        lname: req.body.lname,
        nic: req.body.nic,
        address: req.body.address,
        contact: req.body.contact,
        type: req.body.type,
        license: req.body.license,
        dob: req.body.dob
      };
      conn.query(
        "UPDATE employee SET ? WHERE eid='" + req.body.eid + "' ",
        employee,
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

exports.delEmployee = function(req, res, next) {
  pool.getConnection(function(err, conn) {
    if (err) {
    } else {
      conn.query(
        "UPDATE employee SET active='false' WHERE eid='" + req.body.eid + "' ",
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
