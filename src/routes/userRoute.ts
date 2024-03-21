import { Router } from "express";
import { UserController } from "../controller/UsersController";

const userRoutes = Router();
const userController = new UserController();

// GET USER DATA ROUTE
userRoutes.get("/list", userController.getUserList);

// CREATE USER ROUTE
userRoutes.post("/create", userController.addUser);

// UPDATE USER PROFILE ROUTE
userRoutes.put("/updateProfile/:id", userController.updateUserProfile);

// DELETE USER PROFILE ROUTE
userRoutes.delete("/deleteProfile/:id", userController.deleteUserProfile);

export default userRoutes;
