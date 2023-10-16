import { Schema, model } from "mongoose";

const schema =  new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    reason_of_meeting: { type: String, required: true },
    meeting_place: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now, required: true }
});

const ConferenceModel = model("Conference", schema);
export default ConferenceModel;
