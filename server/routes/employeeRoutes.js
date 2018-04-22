const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const connection = require("../utils/dbconnection");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app, pool) {
  // Add Employee
  app.post("/addemployee", function(req, res) {
    res.send({ hi: "Add Employee" });
  });

  //Get Employee info
  app.get("/getemployee", function(req, res) {
    res.send({ hi: "Get Employee info" });
  });

  //Get all Employees
  app.get("/getemployees", function(req, res) {
    res.send({ hi: "Get all Employees" });
  });

  //delete Employees
  app.put("/deleteemployees", function(req, res) {
    res.send({ hi: "delete Employees" });
  });

  //Edit Employees
  app.put("/editdemployees", function(req, res) {
    res.send({ hi: "Edit Employees" });
  });
};
