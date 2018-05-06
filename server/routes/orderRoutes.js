const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const connection = require("../utils/dbconnection");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // Make Order
  app.post("/makeorder", requireAuth, function(req, res) {
    res.send({ hi: "Make Order" });
  });

  //Get order info
  app.get("/getorder", function(req, res) {
    res.send({ hi: "Get order info" });
  });

  //Get all orders
  app.get("/getorders", function(req, res) {
    res.send({ hi: "Get all orders" });
  });

  //Cancel order
  app.put("/cancelorder", function(req, res) {
    res.send({ hi: "Cancel order" });
  });

  //Edit order
  app.put("/editorder", function(req, res) {
    res.send({ hi: "Edit order" });
  });
};
