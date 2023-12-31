import { Schema, model } from "mongoose";

const schema =  new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    appointment_with: { type: String, required: true },
    reason_of_meeting: { type: String, required: true },
    meeting_place: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now, required: true }
});


const AppointmentModel = model("Appointment", schema);

AppointmentModel.collection.createIndex({
    email: 'text',
    name: 'text',
    contact: 'text',
    appointment_with: 'text',
    reason_of_meeting: 'text',
    meeting_place: 'text',
})

export default AppointmentModel;
