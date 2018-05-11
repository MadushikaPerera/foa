const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const connection = require("../utils/dbconnection");
const delivery = require("../controller/deliveryController");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // Make Delviery
  app.post("/makedelivery", requireAuth, delivery.makeDelivery);

  //Get delivery info
  app.get("/getdelivery", requireAuth, delivery.getDeliveries);

  //Get all deliveries
  app.get("/getdeliveries", requireAuth, delivery.getDeliveries);

  //Cancel delivery
  app.put("/canceldelivery", requireAuth, delivery.cancelDelivery);

  //Edit delivery
  app.put("/editdelivery", requireAuth, delivery.editDelivery);
};
