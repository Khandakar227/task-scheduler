import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import cors from "cors";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import passport from "passport";
import "./libs/passport";
import appointmentRoutes from "./routes/appointment";
import userRoutes from "./routes/user";
import conferenceRoutes from "./routes/conference";
import requestsRoutes from "./routes/requests";
import adminRoutes from "./routes/admin";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY as string],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(
  cors({
    origin: [process.env.CLIENT_URL as string, process.env.ADMIN_URL as string],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());


connect(process.env.MONGODB_URL as string, {
  dbName: process.env.DBNAME,
})
.then((_) => console.log("Connected to database"))
.catch((error) => {
  console.log("connection failed! ", error);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/admin", adminRoutes);
app.use("/v1/auth", authRoutes);
app.use("/v1/appointment", appointmentRoutes);
app.use("/v1/conference", conferenceRoutes);
app.use("/v1/user", userRoutes);
app.use("/v1/requests", requestsRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
