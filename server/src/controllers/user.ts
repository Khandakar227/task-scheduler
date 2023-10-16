import { Request, Response } from 'express'
import { COOKIE_NAME } from '../libs/config';

export const getUser = async (req: Request, res: Response) => {
    try {
        if (!res.locals.user)
            return res.status(403).json({error: true, message: "Not authenticated."})
        res.status(200).json({ error: false, user: {
            email: res.locals.user.email,
            name:  res.locals.user.name,
            profileUrl: res.locals.user.profileUrl
        }
        });
    } catch (error) {
        const err = error as Error;
        console.log(err);
        res.status(500).json({error: true, message: `Error at Server side. ${err.message}`})
    }
}

export const logoutUser = async (req: Request, res: Response) => {
    try {
        res.status(200).clearCookie(COOKIE_NAME).json({message: "logged out"});        
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