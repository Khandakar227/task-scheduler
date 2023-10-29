import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getDay, setTimeFormat } from "../libs";
import { openModal } from "./Modal/modal";
import Modal from "./Modal/Index";
import TimePicker from "./TimePicker";
import { RequestProp } from "../libs/type";
import { toast } from "react-toastify";
import { APPOINMENTS_API_URL } from "../assets/config";

interface Props extends RequestProp {
    type: "appointment" | "booking";
}


const meeting = [
    {with:"Honorable Vice Chancellor", place: "VC Office"},
    {with:"Honorable Pro Vice Chancellor", place: "Pro VC Office"},
]

function RequestModal(props:Props) {
    const [requestLoading, setRequestLoading] = useState(false);
    const [date, setDate] = useState({ startTime: props.startTime, endTime: props.endTime, date: props.date });
    const [meetingWith, setMeetingWith] = useState(meeting[0]);

    useEffect(() => {
        meeting.forEach(m => {
            if(m.with == props.appointment_with) setMeetingWith(m);
        })
    }, [props.appointment_with])

    function TimeAndDateToString() {
        if(date.date && date.startTime && date.endTime)
        return `${getDay(date?.date)} (${setTimeFormat(date?.startTime, '12h')} - ${setTimeFormat(date?.endTime, '12h')})`;
        else return "";
    }

    function onMeetingWithChange(e:ChangeEvent) {
        const meetWith = (e.target as HTMLInputElement).value;
        
        meeting.forEach(m => {
            if(m.with == meetWith) setMeetingWith(m);
        })
    }

    
    async function handleSubmit(e:FormEvent) {
        try {
            e.preventDefault();
            setRequestLoading(true);
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData);
            if(!(date.date && date.endTime && date.startTime)) {
                toast.error("It seems date time is not selected");
                return;
            }
            const response = await fetch(`${APPOINMENTS_API_URL}/${props._id}`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({...data, ...date}),
                headers: { 'Content-Type': 'application/json' }
            });
            const res = await response.json();
            if(res.error) toast.error(res.message);
            else toast.success("Appointment Updated");
            setRequestLoading(false);
        } catch (error) {
            const err = error as Error;
            console.log(err);
            toast.error(err.message);
            setRequestLoading(false);
        }
    }
    return (
    <>
    <form className="text-sm p-4 mx-auto max-w-4xl" onSubmit={handleSubmit}>
        <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-2 py-2">
            <span className="whitespace-nowrap font-bold">Appointment With: </span>    

            <div className="flex sm:flex-row flex-col justify-between sm:items-center md:gap-8 gap-4 w-full max-w-[35rem]">
                <div className="flex items-center gap-2">
                    <input onChange={onMeetingWithChange} type="radio" name="appointment_with" id="vc" value={meeting[0].with} defaultChecked={meeting[0].with == props.appointment_with} required/>
                    <label className="whitespace-nowrap" htmlFor="vc">{meeting[0].with}</label>
                </div>
                <div className="flex items-center gap-2">
                    <input onChange={onMeetingWithChange} type="radio" name="appointment_with" id="pvc" value={meeting[1].with} defaultChecked={meeting[1].with == props.appointment_with} required/>
                    <label className="whitespace-nowrap" htmlFor="pvc">{meeting[1].with}</label>
                </div>
            </div>
        
        </div>
        
        <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-2 py-2">
            <label htmlFor="name" className="whitespace-nowrap font-bold">Name:</label>
            <input type="text" defaultValue={props.name} className="w-full px-4 py-1 rounded-lg outline-none border border-gray-300 shadow-sm max-w-[35rem]" name="name" id="name" required />
        </div>
        
        <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-2 py-2">
            <label htmlFor="contact" className="whitespace-nowrap font-bold">Contact:</label>
            <input type="number" defaultValue={props.contact} className="w-full px-4 py-1 rounded-lg outline-none border border-gray-300 shadow-sm max-w-[35rem]" name="contact" id="contact" required/>
        </div>
        
        <div className="flex sm:flex-row flex-col justify-between gap-2 py-2">
            <label htmlFor="reason_of_meeting" className="whitespace-nowrap font-bold">Reason of Meeting :</label>
            <textarea className="w-full px-4 py-1 rounded-lg outline-none border border-gray-300 shadow-sm max-w-[35rem]" rows={5} name="reason_of_meeting" id="reason_of_meeting"  defaultValue={props.reason_of_meeting} required></textarea>
        </div>
        
        <div className="flex sm:flex-row flex-col justify-between gap-2 py-2">
            <label htmlFor="datetime" className="whitespace-nowrap font-bold">Date & Time :</label>
            <div className="w-full max-w-[35rem] flex justify-start items-center gap-4">
                <span> {TimeAndDateToString()}</span>
                <button type="button" onClick={() =>openModal({name: "time-picker"})} className="underline text-green-700 cursor-pointer"> Pick Time </button>
            </div>
        </div>
        
        <div className="flex sm:flex-row flex-col justify-between gap-2 py-2">
            <span className="font-bold">Meeting Place :</span>
            
            <div className="flex sm:flex-row flex-col justify-between sm:items-center md:gap-8 gap-4 w-full max-w-[35rem]">
                <div className="flex items-center gap-2">
                    <input type="radio" name="meeting_place" id="vc-office" value={meetingWith.place} defaultChecked={props.meeting_place == meetingWith.place} />
                    <label className="whitespace-nowrap" htmlFor="vc-office">{meetingWith.place}</label>
                </div>
                
                <div className="flex items-center gap-2">
                    <input type="radio" name="meeting_place" id="board-room" value={"Board Room"} defaultChecked={props.meeting_place == "Board Room"} />
                    <label className="whitespace-nowrap" htmlFor="board-room">Board Room</label>
                </div>

                <div className="flex items-center gap-2">
                    <input type="radio" name="meeting_place" id="committee-room" value={"Committee Room"} defaultChecked={props.meeting_place == "Committee Room"} />
                    <label className="whitespace-nowrap" htmlFor="committee-room">Committee Room</label>
                </div>
            </div>
        </div>
        <div className="flex justify-end pt-10">
            <button disabled={requestLoading} type="submit" className="bg-green-600 py-1 px-8 flex rounded-3xl text-white text-xl font-bold">
            {requestLoading ? 'Please wait...' : 'Update'}
            </button>
        </div>
    </form>
    
    <Modal name="time-picker">
        <TimePicker setDate={setDate} date={date}/>
    </Modal>
    </>
  )
}

export default RequestModal