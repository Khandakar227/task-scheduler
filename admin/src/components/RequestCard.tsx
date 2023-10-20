import { useState } from "react";
import { getDMYFormat, getDay, setTimeFormat } from "../libs";
import RequestModal from "./RequestModal";
import { AiOutlineClose } from "react-icons/ai";
import { RequestProp } from "../libs/type";

interface Props extends RequestProp {
    type: "appointment" | "booking";
}

export default function RequestCard(props:Props) {
    const [showReason, setShowReason] = useState(false);
    const [showEditForm, setEditForm] = useState(false);

    function viewReason() {setShowReason(!showReason)}

    function onShowEditForm () {
        setEditForm(true);
    }
    
    function closeEdtForm() {
        setEditForm(false);
    }
    return (
    <>
        <div className="py-4">
            <div className="p-4 rounded-md shadow bg-white border-green-500 border-b-4">
                <h2 className="text-lg font-bold text-green-600">
                {
                props.type == 'appointment' ?
                    `Appointment Request For: ${props.appointment_with}`
                    : 
                    `Room Booking Request For: ${props.meeting_place}`
                }
                </h2>
                <p className="font-semibold text-lg">Request from: {props.name}</p>
                <div className="[&>*:nth-child(odd)]:bg-slate-50 md:[&>*:nth-child(odd)]:bg-white pt-4 flex flex-col md:flex-row justify-between font-semibold max-w-3xl text-base md:text-sm">
                    <span className="p-1">Date: {getDay(props.date)} - {getDMYFormat(props.date)}</span>
                    <span className="p-1">Start Time: {setTimeFormat(props.startTime, '12')}</span>
                    <span className="p-1">End Time: {setTimeFormat(props.endTime, '12')}</span>
                    {
                        props.type == 'appointment' &&
                        (<span className="p-1">Place: {props.meeting_place}</span>)
                    }
                </div>
                <div className="pt-2">
                    {showReason && (<p className="py-4 whitespace-pre-line"><span className="font-medium">Reason:</span> {props.reason_of_meeting.trim()}</p>)}
                    <div className="flex justify-between flex-col sm:flex-row items-center gap-4 text-sm">
                        <div className="w-full">
                            <button onClick={viewReason} className="px-3 py-1 bg-gray-300 rounded-md font-medium shadow">
                                {showReason ? "Hide Reason" : "View Reason"}
                            </button>
                            
                            <span
                                className={`font-medium p-2 ${props.status == 'Pending' ? 'text-yellow-600' : props.status == 'Approved' ? 'text-green-600' : 'text-red-600' }`}
                            >
                                {props.status}
                            </span>
                        </div>
                        <div className="max-w-[310px] w-full">
                            <button onClick={onShowEditForm} className="px-3 py-1 bg-gray-300 rounded-md font-medium shadow">
                                Edit request
                            </button>
                            <button className="mx-4 px-3 py-1 bg-green-400 rounded-md font-medium shadow">
                                Accept
                            </button>
                            <button className="mx-4 px-3 py-1 bg-red-400 rounded-md font-medium shadow">
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
            showEditForm && (
            <div className="overflow-auto flex justify-center items-baseline fixed top-0 left-0 right-0 bottom-0">
                <div className="z-0 absolute top-0 bottom-0 left-0 right-0 bg-opacity-25 bg-black" />
                <div className="mt-8 overflow-auto bg-white rounded-md w-full max-w-2xl z-[1]">
                    <div className="p-4 text-end">
                        <button onClick={closeEdtForm}><AiOutlineClose size={28}/></button>
                    </div>
                    <RequestModal {...props}/>
                </div>
            </div>
            )
        }
    </>
  )
}
