import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import cors from "cors";
import cookieSession from "cookie-session";
import authRoutes from "./routes/auth";
import passport from "passport";
import "./libs/passport";

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

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

connect(process.env.MONGODB_URL as string, {
  dbName: process.env.DBNAME,
})
  .then((_) => console.log("Connected to database"))
  .catch((error) => {
    console.log("connection failed! ", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
