const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const Employees = require("../controller/employeeController");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app, pool) {
  app.get("/hi", Employees.getUser);

  app.post("/signin", requireSignin, Authentication.signin);

  app.post("/signup", Authentication.signup);
};
