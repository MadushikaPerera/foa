const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const Employees = require("../controller/employeeController");
const User = require("../controller/userController");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.get("/hi", Employees.getUser);

  app.post("/adduser", User.addUser);

  app.post("/signin", requireSignin, Authentication.signin);

  app.post("/signup", Authentication.signup);
};
