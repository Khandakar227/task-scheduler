import { Profile } from "passport-google-oauth20";
import UserModel from "../models/User";

export const addUser = async (user?: Profile) => {
  if (!user) return;
  const userData = await UserModel.findOneAndUpdate(
    { email: user.emails?.length ? user.emails[0].value : user._json.email },
    {
      $set: {
        name: user.displayName,
        email: user.emails?.length ? user.emails[0].value : user._json.email,
        profileUrl: user._json.picture,
        logged_in_at: Date.now(),
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return userData;
};
