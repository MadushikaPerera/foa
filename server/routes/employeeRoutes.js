const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const connection = require("../utils/dbconnection");
const EmployeeController = require("../controller/employeeController");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app, pool) {
  // Add Employee
  app.post("/addemployee", EmployeeController.addEmployee);

  //Get Employee info
  app.get("/getemployees", EmployeeController.getEmployee);

  //Get all Employees
  app.get("/getemployee", function(req, res) {
    res.send({ hi: "Get all Employees" });
  });

  //delete Employees
  app.put("/delemployee", EmployeeController.delEmployee);

  //Edit Employees
  app.put("/editemployee", EmployeeController.editEmployee);
};
