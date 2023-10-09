import express from "express";
import { verifyCookie } from "../middlewares/cookie";
import { getUser } from "../controllers/user";
const userRoutes = express.Router();

userRoutes.get("/", verifyCookie, getUser);

export default userRoutes;