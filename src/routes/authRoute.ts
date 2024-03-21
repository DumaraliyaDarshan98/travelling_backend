import { Router } from "express";
import { AuthController } from "../controller/AuthController";

const authRoutes = Router();
const authController = new AuthController();

// USER LOGIN ROUTE
authRoutes.post('/login', authController.login);

export default authRoutes;
