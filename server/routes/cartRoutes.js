const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const connection = require("../utils/dbconnection");
const cart = require("../controller/cartController");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // Add cart item
  app.post("/addtocart", requireAuth, cart.addToCart);

  //Get cart items
  app.get("/getcartitems", requireAuth, cart.getCartItems);

  //Get all item
  app.get("/getdeliveries", requireAuth, cart.getCartItems);

  //Cancel cart item
  app.put("/deletecartitem", requireAuth, cart.cancelCartItem);

  //Edit cart item
  app.put("/editcartitem", requireAuth, cart.editCartItem);
};
