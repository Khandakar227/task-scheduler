import express from "express";
import { getAllRequests } from "../controllers/requests";
import { verifyCookie } from "../middlewares/cookie";
import validationErrorHandler from "../middlewares/validityHandler";

const requestsRoutes = express.Router();

requestsRoutes.get("/", verifyCookie, getAllRequests);

export default requestsRoutes;