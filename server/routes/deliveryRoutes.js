const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const connection = require("../utils/dbconnection");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app, pool) {
  // Make Delviery
  app.post("/makedelivey", function(req, res) {
    res.send({ hi: "Make Delviery" });
  });

  //Get delivery info
  app.get("/getdelivey", function(req, res) {
    res.send({ hi: "Get delivery info" });
  });

  //Get all deliveries
  app.get("/getdeliveries", function(req, res) {
    res.send({ hi: "Get all deliveries" });
  });

  //Cancel delivery
  app.put("/canceldelivery", function(req, res) {
    res.send({ hi: "Cancel delivery" });
  });

  //Edit delivery
  app.put("/editdelivery", function(req, res) {
    res.send({ hi: "Edit delivery" });
  });
};
