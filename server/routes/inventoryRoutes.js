const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const connection = require('../utils/dbconnection');

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  
    app.get("/hi", function(req, res) {
      res.send({ hi: "there" });
    });
  
};
  