import { useState } from "react";
import { getDMYFormat, getDay, setTimeFormat } from "../libs";

type Props = {
    type: "appointment" | "booking";
    to: string;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    meetingPlace: string;
    reasonOfMeeting: string;
    status: 'Approved' | 'Declined' | 'Pending';
}

export default function RequestCard(props:Props) {
    const [showReason, setShowReason] = useState(false);

    function viewReason() {setShowReason(!showReason)}
  return (
    <div className="py-4">
        <div className="p-4 rounded-md shadow bg-white border-green-500 border-b-4">
            <h2 className="text-lg font-bold text-green-600">
            {
            props.type == 'appointment' ?
                `Appointment Request For: ${props.to}`
                : 
                `Room Booking Request For: ${props.meetingPlace}`
            }
            </h2>
            <p className="font-semibold text-lg">Request from: {props.name}</p>
            <div className="[&>*:nth-child(odd)]:bg-slate-50 md:[&>*:nth-child(odd)]:bg-white pt-4 flex flex-col md:flex-row justify-between font-semibold max-w-3xl text-base md:text-sm">
                <span className="p-1">Date: {getDay(props.date)} - {getDMYFormat(props.date)}</span>
                <span className="p-1">Start Time: {setTimeFormat(props.startTime, '12')}</span>
                <span className="p-1">End Time: {setTimeFormat(props.endTime, '12')}</span>
                {
                    props.type == 'appointment' &&
                    (<span className="p-1">Place: {props.meetingPlace}</span>)
                }
            </div>
            <div className="pt-2">
                {showReason && (<p className="pb-4 whitespace-pre-line"><span className="font-medium">Reason:</span> {props.reasonOfMeeting.trim()}</p>)}
                <div className="sm:flex items-center gap-4">
                    <button onClick={viewReason} className="px-3 py-1 text-sm bg-gray-300 rounded-md font-medium shadow">
                        {showReason ? "Hide Reason" : "View Reason"}
                    </button>
                    <span
                        className={`font-medium p-2 ${props.status == 'Pending' ? 'text-yellow-600' : props.status == 'Approved' ? 'text-green-600' : 'text-red-600' }`}
                    >
                        {props.status}
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}
