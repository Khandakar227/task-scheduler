"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileUrl: { type: String },
    created_at: { type: Date, default: Date.now },
    logged_in_at: { type: Date, default: Date.now },
});
const UserModel = (0, mongoose_1.model)("User", schema);
exports.default = UserModel;
