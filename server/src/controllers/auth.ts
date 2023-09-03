import { Request, Response } from "express";
import passport from "passport";

export const googleAuthCallback = async (req: Request, res: Response) => {
    try {
        console.log("googleAuthCallback", process.env.CLIENT_URL)
        passport.authenticate("google",{
            successRedirect: `${process.env.CLIENT_URL}/appointment`,
            failureRedirect: "/auth/failed"
        })
    } catch (err) {
        console.log(err)
    }
}

export const googleAuthFailed =  async (req: Request, res: Response) => {
    try {
        console.log("googleAuthFailed")
        res.status(401).json({
            error: true,
            message: "Failed"
        })
    } catch (err) {
        console.log(err)
    }
}