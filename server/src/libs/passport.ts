import passport from 'passport';
import {Profile, Strategy, VerifyCallback} from 'passport-google-oauth20'
import dotenv from "dotenv";

dotenv.config();

const GoogleStrategy = new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: '/v1/auth/google/callback',
    scope: ['profile', 'email'],
},

function (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    console.log("callback", accessToken, profile)
    done(null, profile);
}
)

passport.use(GoogleStrategy);

passport.serializeUser(function(user, done) {
    console.log("serialize", user)
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log("deserialize", user)
    done(null, user as any);
});