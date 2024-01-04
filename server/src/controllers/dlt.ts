import { Request, Response } from "express";
import DLTModel from "../models/DLT";
import { timeToDate } from "../libs/utils";

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
            start_time: timeToDate(date_of_booking, start_time),
            end_time: timeToDate(date_of_booking, end_time),
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


export const getDLTBookings = async (req: Request, res: Response) => {
    try {
        if (!res.locals?.user.email)
        return res.status(200).json({error: false, data:[] });

        const data = await DLTModel.find({email: res.locals?.user.email});
        res.status(200).json({error: false, data });

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

export const updateDLT = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const body = req.body as Object;
        let updateFields:any = {};
        await Promise.resolve(
            Object.keys(body).forEach(k => {
            if (body[k as keyof Object]) updateFields[k] = body[k as keyof Object];
            })
        );
        const data = await DLTModel.findByIdAndUpdate(id, updateFields, {new: true});
        res.status(200).json({error: false, data });
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

export const searchDLTForm = async (req: Request, res: Response) => {
    try {
        const { q } = req.query;
        if(!q || !(q as string).trim()) return res.status(200).json({error: false, data: []});
        
        const dltRooms = await DLTModel.find({$text: {$search:  (q as string).trim()}});

        res.status(200).json({error: false, data: dltRooms});
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