import passport from 'passport';
import {Profile, Strategy, VerifyCallback} from 'passport-google-oauth20'

const GoogleStrategy = new Strategy({
    clientID: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    callbackURL: '/auth/google/callback',
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
})