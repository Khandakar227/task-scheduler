"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_1 = require("../middlewares/cookie");
const dlt_1 = require("../controllers/dlt");
const dltRoutes = express_1.default.Router();
dltRoutes.post("/", cookie_1.verifyCookie, dlt_1.bookDLT);
dltRoutes.get("/", cookie_1.verifyCookie, dlt_1.getDLTBookings);
exports.default = dltRoutes;
