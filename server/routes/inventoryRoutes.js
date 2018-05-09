const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const connection = require("../utils/dbconnection");
const inventoryController = require("../controller/inventoryController");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.get("/hi", function(req, res) {
    res.send({ hi: "there" });
  });

  app.post("/addfood", requireAuth, inventoryController.addInventoryFoodItem);

  app.get(
    "/getfooditems",
    requireAuth,
    inventoryController.getInventoryFoodItems
  );

  app.put("/editfood", requireAuth, inventoryController.editFoodItem);

  app.put("/delfood", requireAuth, inventoryController.deleteFoodItem);

  app.post("/addvehicle", requireAuth, inventoryController.addInventoryVehicle);

  app.get(
    "/getvehicles",
    requireAuth,
    inventoryController.getInventoryVehicleItems
  );

  app.put("/delvehicle", requireAuth, function(req, res) {});
};
