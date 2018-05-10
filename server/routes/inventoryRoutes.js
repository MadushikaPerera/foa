const Authentication = require("../utils/auth");
const passportService = require("../utils/passport");
const passport = require("passport");
const connection = require("../utils/dbconnection");
const inventoryController = require("../controller/inventoryController");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  // Food rotues
  app.post("/addfood", requireAuth, inventoryController.addInventoryFoodItem);

  app.get(
    "/getfooditems",
    requireAuth,
    inventoryController.getInventoryFoodItems
  );

  app.put("/editfood", requireAuth, inventoryController.editFoodItem);

  app.put("/delfood", requireAuth, inventoryController.deleteFoodItem);

  // Vehicle rotues
  app.post("/addvehicle", requireAuth, inventoryController.addInventoryVehicle);

  app.get(
    "/getvehicles",
    requireAuth,
    inventoryController.getInventoryVehicleItems
  );

  app.put("/editvehicle", requireAuth, inventoryController.editVehicleItems);

  app.put("/delvehicle", requireAuth, inventoryController.deleteVehicleItem);

  // Ingredients rotues
  app.post(
    "/addingredients",
    requireAuth,
    inventoryController.addInventoryIngredient
  );

  app.get(
    "/getingredients",
    requireAuth,
    inventoryController.getInventoryIngredientItems
  );

  app.put(
    "/editingredient",
    requireAuth,
    inventoryController.editIngredientItems
  );

  app.put(
    "/delingredient",
    requireAuth,
    inventoryController.deleteIngredientItem
  );
};
