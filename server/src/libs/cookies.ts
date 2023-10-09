import { sign } from 'jsonwebtoken';
import {Profile, } from 'passport-google-oauth20';
import { JWT_EXPIRES_IN } from './config';

export const createCookie = (path:string, user?:Profile) => {
    //JSON web token
    if (!user) throw Error("Failed to create cookie");    
    return sign({
        email: user.emails?.length ? user.emails[0].value : user._json.email,
        name: user.displayName,
        profileUrl: user._json.picture,
        path,
    }, process.env.JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN })
}
