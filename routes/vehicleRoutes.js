const express = require("express");
const vehicleController = require("../controllers/vehicleController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const vehicleRoutes = express.Router();

vehicleRoutes.use(authentication);
vehicleRoutes.get("/brands", vehicleController.getAllBrands);
vehicleRoutes.get("/brands/:id", vehicleController.getBrandsById);
vehicleRoutes.post("/brands", authorization, vehicleController.createBrand);
vehicleRoutes.patch("/brands/:id", authorization, vehicleController.updateBrands);
vehicleRoutes.delete("/brands/:id", authorization, vehicleController.deleteBrands);

vehicleRoutes.get("/types", vehicleController.getAllTypes);
vehicleRoutes.get("/types/:id", vehicleController.getTypesById);
vehicleRoutes.post("/types", authorization, vehicleController.createType);
vehicleRoutes.patch("/types/:id", authorization, vehicleController.updateTypes);
vehicleRoutes.delete("/types/:id", authorization, vehicleController.deleteTypes);

module.exports = vehicleRoutes;
