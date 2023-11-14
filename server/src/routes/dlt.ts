import express from "express";
import validationErrorHandler from "../middlewares/validityHandler";
import { verifyCookie } from "../middlewares/cookie";
import { bookDLT, getDLTBookings } from "../controllers/dlt";

const dltRoutes = express.Router();
dltRoutes.post("/", verifyCookie, bookDLT);
dltRoutes.get("/", verifyCookie, getDLTBookings);

export default dltRoutes;