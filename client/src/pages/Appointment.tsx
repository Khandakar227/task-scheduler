import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { APPOINTMENT_URL } from "../assets/config";
import { toast } from 'react-toastify';
import Modal from "../components/Modal/Index";
import AppointmentTimePicker from "../components/AppointmentTimePicker";
import { openModal } from "../components/Modal/modal";
import { getDay, setTimeFormat } from "../libs";
// import { useUser } from "../contexts/UserContext";
// import AppointmentTimePicker from "../components/AppointmentTimePicker";
const meeting = [
    {with:"Honorable Vice Chancellor", place: "VC Office"},
    {with:"Honorable Pro Vice Chancellor", place: "Pro VC Office"},
]
export default function Appointment() {
    // const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [requestLoading, setRequestLoading] = useState(false);
    const [date, setDate] = useState({ startTime: "", endTime: "", date: "" });
    const [meetingWith, setMeetingWith] = useState(meeting[0]);

    useEffect(() => {
        fetch(`${APPOINTMENT_URL}`, {credentials: 'include'})
        .then(res=> res.json())
        .then((data) => {
             if (data.error) {
                toast.error("Unauhorized access, Please connect with your email.");
                location.href = "/";
            }
             else setLoading(false);
        })
        .catch((err) => console.log(err))
    }, [])

    async function handleSubmit(e:FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        // Show error if no date was selected
        if (!(date.endTime && date.startTime && date.date))
            toast.error("Select appointment time", {theme: 'colored'});
        else {
            try {
                setRequestLoading(true);
                const body = {
                    ...data,
                    ...date,
                };
                const res = await fetch(`${APPOINTMENT_URL}/create`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify(body),
                })
                const response = await res.json()
                if (response.error) toast.error(`Unexpected error occured: ${response.message}`);
                else {
                    toast.success("Appointment has been created and awaited for review");
                    (e.target as HTMLFormElement).reset();
                }
            } catch (error) {
                const err = error as Error;
                console.log(err.message);
            } finally {
                setRequestLoading(false);
            }
        }
    }

    function TimeAndDateToString() {
        if(date.date && date.startTime && date.endTime)
        return `${getDay(date?.date)} (${setTimeFormat(date?.startTime, '12h')} - ${setTimeFormat(date?.endTime, '12h')})`;
        else return "";
    }

    function onMeetingWithChange(e:ChangeEvent) {
        const meetWith = (e.target as HTMLInputElement).value;
        console.log(meetWith)
        meeting.forEach(m => {
            if(m.with == meetWith) setMeetingWith(m);
        })
    }

    if (loading) return (
    <>
        <main className='font-nunito min-h-screen'>
            <Header />
            <div className="min-h-[85vh] flex justify-center items-center">
                <Loader/>
            </div>
        </main>
    </>)

    return (
    <>
      <main className='font-nunito min-h-screen'>
        <Header>
            <div className="p-4 flex-auto">
                <h2 className="font-bold text-2xl text-center py-8">Get Your Appointment</h2>
                <form className="mx-auto max-w-4xl" onSubmit={handleSubmit}>
                    <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-2 py-2">
                        <span className="font-bold">Appointment With: </span>    
                        
                        <div className="flex sm:flex-row flex-col justify-between sm:items-center md:gap-8 gap-4 w-full max-w-[35rem]">
                            <div className="flex items-center gap-2">
                                <input onChange={onMeetingWithChange} type="radio" name="appointment_with" id="vc" value={meeting[0].with} defaultChecked={true} required/>
                                <label htmlFor="vc">{meeting[0].with}</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input onChange={onMeetingWithChange} type="radio" name="appointment_with" id="pvc" value={meeting[1].with} required/>
                                <label htmlFor="pvc">{meeting[1].with}</label>
                            </div>
                        </div>
                    
                    </div>
                    
                    <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-2 py-2">
                        <label htmlFor="name" className="font-bold">Name:</label>
                        <input type="text" className="w-full px-4 py-1 rounded-lg outline-none border border-gray-300 shadow-sm max-w-[35rem]" name="name" id="name" required />
                    </div>
                    
                    <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-2 py-2">
                        <label htmlFor="contact" className="font-bold">Contact:</label>
                        <input type="number" className="w-full px-4 py-1 rounded-lg outline-none border border-gray-300 shadow-sm max-w-[35rem]" name="contact" id="contact" required/>
                    </div>
                    
                    <div className="flex sm:flex-row flex-col justify-between gap-2 py-2">
                        <label htmlFor="reason_of_meeting" className="font-bold">Reason of Meeting :</label>
                        <textarea className="w-full px-4 py-1 rounded-lg outline-none border border-gray-300 shadow-sm max-w-[35rem]" rows={5} name="reason_of_meeting" id="reason_of_meeting" required></textarea>
                    </div>
                    
                    <div className="flex sm:flex-row flex-col justify-between gap-2 py-2">
                        <label htmlFor="datetime" className="font-bold">Date & Time :</label>
                        <div className="w-full max-w-[35rem] flex justify-start items-center gap-4">
                            <span> {TimeAndDateToString()}</span>
                            <button type="button" onClick={() =>openModal({name: "time-picker"})} className="underline text-green-700 cursor-pointer"> Pick Time </button>
                        </div>
                    </div>
                    
                    <div className="flex sm:flex-row flex-col justify-between gap-2 py-2">
                        <span className="font-bold">Meeting Place :</span>
                        
                        <div className="flex sm:flex-row flex-col justify-between sm:items-center md:gap-8 gap-4 w-full max-w-[35rem]">
                            <div className="flex items-center gap-2">
                                <input type="radio" name="meeting_place" id="vc-office" value={meetingWith.place} defaultChecked={true} />
                                <label htmlFor="vc-office">{meetingWith.place}</label>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <input type="radio" name="meeting_place" id="board-room" value={"Board Room"} />
                                <label htmlFor="board-room">Board Room</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="radio" name="meeting_place" id="committee-room" value={"Committee Room"} />
                                <label htmlFor="committee-room">Committee Room</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end py-10">
                        <button disabled={requestLoading} type="submit" className="bg-green-600 py-2 px-8 flex rounded-3xl text-white text-xl font-bold">
                        {requestLoading ? 'Please wait...' : 'Request Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </Header>
        <Modal name="time-picker">
            <AppointmentTimePicker setDate={setDate} date={date}/>
        </Modal>
      </main>
    </>
  )
}
