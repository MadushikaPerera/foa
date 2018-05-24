const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const Employees = require("../controller/employeeController");
const User = require("../controller/userController");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.get("/getuser", User.getUser);

  app.put("/edituser", User.updateUser);

  app.post("/signin", requireSignin, Authentication.signin);

  app.post("/signup", Authentication.signup);
};
