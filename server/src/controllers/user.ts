import { Request, Response } from 'express'

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
