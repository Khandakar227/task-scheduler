import { Schema, model } from "mongoose";

const schema =  new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileUrl: { type: String },
    created_at: { type: Date, default: Date.now },
    logged_in_at: { type: Date, default: Date.now },
});

const UserModel = model("User", schema);
export default UserModel;