import express from "express";
import { verifyCookie } from "../middlewares/cookie";
import { getUser, logoutUser } from "../controllers/user";
const userRoutes = express.Router();

userRoutes.get("/", verifyCookie, getUser);
userRoutes.get("/logout", logoutUser);
export default userRoutes;