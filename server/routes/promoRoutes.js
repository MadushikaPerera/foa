const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const connection = require("../utils/dbconnection");
const promo = require("../controller/promoController");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // Make Promo
  app.post("/addpromo", requireAuth, promo.addPromos);

  //Get Promo info
  app.get("/getpromo", requireAuth, promo.getPromos);

  //Get all Promos
  app.get("/getpromos", requireAuth, promo.getPromos);

  //Cancel Promo
  app.put("/cancelpromo", requireAuth, promo.cancelPromo);

  //Edit Promo
  app.put("/editpromo", requireAuth, promo.editPromo);
};
