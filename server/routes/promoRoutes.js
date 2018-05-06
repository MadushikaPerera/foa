const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const connection = require("../utils/dbconnection");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // Make Promo
  app.post("/addpromo", requireAuth, function(req, res) {
    res.send({ hi: "Make Promo" });
  });

  //Get Promo info
  app.get("/getpromo", function(req, res) {
    res.send({ hi: "Get Promo info" });
  });

  //Get all Promos
  app.get("/getpromos", function(req, res) {
    res.send({ hi: "Get all deliveries" });
  });

  //Cancel Promo
  app.put("/cancelpromo", function(req, res) {
    res.send({ hi: "Cancel Promo" });
  });

  //Edit Promo
  app.put("/editpromo", function(req, res) {
    res.send({ hi: "Edit Promo" });
  });
};
