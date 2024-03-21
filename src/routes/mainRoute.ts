import { Router } from "express";
import userRoutes from "./userRoute";
import authRoutes from "./authRoute";
import locationRoutes from "./locationRoute";
import travelingRoutes from "./travelingRoute";

const mainRoute = Router();

mainRoute.use("/user", userRoutes);
mainRoute.use("/location", locationRoutes);
mainRoute.use("/traveling", travelingRoutes);
mainRoute.use("/auth", authRoutes);

export default mainRoute;