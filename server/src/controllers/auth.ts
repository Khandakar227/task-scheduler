import { Request, Response } from "express";

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