import express, { Request, Response } from "express";
import { googleAuthFailed } from "../controllers/auth";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const googleAuthRoutes = express.Router();

googleAuthRoutes.get("/appointment/google",passport.authenticate("appointment-google-sign-in", {
    scope: ["profile", "email"],
  })
);

googleAuthRoutes.get("/conference/google", passport.authenticate("conference-google-sign-in", {
    scope: ["profile", "email"],
  })
);
googleAuthRoutes.get("/appointment/google/callback", (req, res) => {
  passport.authenticate("appointment-google-sign-in", function (
      err: any,
      user?: Express.User,
      info?: object | string | Array<string | undefined>,
      status?: number | Array<number | undefined>
    ) {
      if (err) {
        console.log(err);
        res
          .status(401)
          .json({ error: true, message: "Failed to authenticate" });
          return;
      }
      res.redirect(`${process.env.CLIENT_URL}/appointment`);
    }
  )(req, res);
});

googleAuthRoutes.get("/conference/google/callback", (req, res) => {
  passport.authenticate("conference-google-sign-in",
    function (
      err: any,
      user?: Express.User,
      info?: object | string | Array<string | undefined>,
      status?: number | Array<number | undefined>
    ) {
      if (err) {
        console.log(err);
        res
          .status(401)
          .json({ error: true, message: "Failed to authenticate" });
          return;
      }
      res.redirect(`${process.env.CLIENT_URL}/conference`);
    }
  )(req, res);
});

googleAuthRoutes.get("/google/callback/failed", googleAuthFailed);

export default googleAuthRoutes;
