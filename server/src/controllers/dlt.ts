import { Request, Response } from "express";
import DLTModel from "../models/DLT";

export const bookDLT = async (req: Request, res: Response) => {
    try {
        const {
            meeting_place,
            name,
            designation,
            designation_post,
            mobile_no,
            details,
            date_of_booking,
            start_time,
            end_time,
            duration,
            tech_supports,
            logistics_supports,
            logistics_support_reason,
            official_coverage,
            refreshment_supports,
            participants_count
        } = req.body;
        
        const dlt = await DLTModel.create({
            email: res.locals.user.email,
            meeting_place,
            name,
            designation,
            designation_post,
            mobile_no,
            details,
            date_of_booking,
            start_time,
            end_time,
            duration,
            tech_supports,
            logistics_supports,
            logistics_support_reason,
            official_coverage,
            refreshment_supports,
            participants_count
        });
        res.status(200).json({ error: false, message: "DLT Room booked.", data: dlt })
    } catch (error) {
        const err = error as Error;
        console.log(err.message);
        res
        .status(500)
        .json({
            error: true,
            message: `Unexpected error occured on the server. ${err.message}`,
        });
    }
}