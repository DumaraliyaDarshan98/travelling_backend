import { Router } from "express";
import { LocationController } from "../controller/LocationController";
import { upload } from "../core/mluterConfig";

const locationRoutes = Router();
const locationController = new LocationController();

// GET LOCATION LIST ROUTE
locationRoutes.get("/list", locationController.getLocationList);

// CREATE LOCATION ROUTE
locationRoutes.post("/create", upload.single("image"),locationController.addLocation);

// UPDATE LOCATION ROUTE
locationRoutes.put("/updateLocation/:id",upload.single("image"), locationController.updateLocation);

// DELETE LOCATION ROUTE
locationRoutes.delete("/deleteLocation/:id", locationController.deleteLocation);

// GET SPECIFIC LOCATION ROUTE
locationRoutes.get("/getLocation/:id",locationController.getLocation);


export default locationRoutes;
