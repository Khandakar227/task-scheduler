import { Schema, model } from "mongoose";

const schema =  new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    designation: { type: String, required: true },
    designation_post: { type: String, required: true },
    mobile_no: { type: String, required: true },
    details: { type: String, required: true },
    date_of_booking: { type: Date, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    duration: { type: Number, required: true },
    tech_supports: [{ type: String }],
    logistics_supports: [{ type: String }],
    logistics_support_reason: { type: String },
    official_coverage: [{ type: String }],
    refreshment_supports: [{ type: String }],
    meeting_place: { type: String, required: true, default: "DLT Room" },
    participants_count: {type: Number, required: true},
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

const DLTModel = model("DLT", schema);

DLTModel.collection.createIndex({
    name: 'text',
    email: 'text',
    designation: 'text',
    designation_post: 'text',
    mobile_no: 'text',
    details: 'text',
})

export default DLTModel;