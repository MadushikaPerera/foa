const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const connection = require("../utils/dbconnection");
const order = require("../controller/odersController");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // Make Order
  app.post("/makeorder", requireAuth, order.makeOrder);

  //Get order info
  app.get("/getorder", order.getOrders);

  //Get all orders
  app.get("/getallorders", requireAuth, order.getAllOrders);

  //Cancel order
  app.put("/cancelorder", requireAuth, order.cancelOrder);

  //Edit order
  app.put("/editorder", requireAuth, order.editOrder);
};
