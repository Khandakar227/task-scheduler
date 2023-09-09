import { Request, Response } from "express";

export const createAppointmentHandler = (req:Request, res:Response) => {
    try {

    } catch (err) {
        const error  = err as Error;
        console.log(error.message);
        res.status(500).json({error: true, message: `Failed to create appointment. ${error.message}`})
    }
}


export const verifyAppointmentHandler = (req:Request, res:Response) => {
    try {
        if(res.locals.user) res.status(200).json({error: false, message: "verified"})
    } catch (err) {
        const error  = err as Error;
        console.log(error.message);
        res.status(500).json({error: true, message: `Failed to verify. ${error.message}`})
    }
}