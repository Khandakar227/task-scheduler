import express from "express";
import { getAdmin, logoutAdmin, signInAsAdmin, signUpAsAdmin } from "../controllers/admin";
import { verifyAdminCookie } from "../middlewares/cookie";

const adminRoutes = express.Router();

adminRoutes.get("/", verifyAdminCookie, getAdmin);
adminRoutes.post("/sign-up", signUpAsAdmin);
adminRoutes.post("/login", signInAsAdmin);
adminRoutes.get("/logout", logoutAdmin);
export default adminRoutes;
