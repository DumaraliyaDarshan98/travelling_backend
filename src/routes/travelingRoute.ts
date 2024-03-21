import { Router } from "express";
import { TravelingController } from "../controller/TravelingController"; 
import { upload } from "../core/mluterConfig";

const travelingRoutes = Router();
const travelingController = new TravelingController();

// GET TRAVELING LIST ROUTE
travelingRoutes.get("/list", travelingController.getTravelingList);

// CREATE TRAVELING ROUTE
travelingRoutes.post("/create", upload.single("image"),travelingController.addTraveling);
 
// UPDATE TRAVELING ROUTE
travelingRoutes.put("/updateTraveling/:id", upload.single("image"),travelingController.updateTraveling);

// DELETE TRAVELING ROUTE
travelingRoutes.delete("/deleteTraveling/:id",travelingController.deleteTraveling);

// GET SPECIFIC TRAVELING ROUTE
travelingRoutes.get("/getTraveling/:id",travelingController.getTraveling);

export default travelingRoutes;