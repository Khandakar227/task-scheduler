import { FormEvent, useEffect, useState } from "react";
import Header from "../components/Header";
import { getDay, setTimeFormat } from "../libs";
import { CONFERENCE_URL } from "../assets/config";
import { toast } from "react-toastify";
import { openModal } from "../components/Modal/modal";
import Modal from "../components/Modal/Index";
import AppointmentTimePicker from "../components/AppointmentTimePicker";
import Loader from "../components/Loader";

export default function Conference() {
    const [loading, setLoading] = useState(true);
    const [requestLoading, setRequestLoading] = useState(false);
    const [date, setDate] = useState({ startTime: "", endTime: "", date: "" });

    useEffect(() => {
        fetch(`${CONFERENCE_URL}`, {credentials: 'include'})
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

    function TimeAndDateToString() {
        if(date.date && date.startTime && date.endTime)
        return `${getDay(date?.date)} (${setTimeFormat(date?.startTime, '12h')} - ${setTimeFormat(date?.endTime, '12h')})`;
        else return "";
    }

    
    function handleSubmit(e:FormEvent) {
        e.preventDefault();
        setRequestLoading(true);
        setTimeout(async () => {
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData);
            // Show error if no date was selected
            if (!(date.endTime && date.startTime && date.date))
                toast.error("Select conference time", {theme: 'colored'});
            else {
                try {
                    const body = {
                        ...data,
                        ...date,
                    };
                    const res = await fetch(`${CONFERENCE_URL}/create`, {
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
                        toast.success("A conference has been booked and awaited for review");
                        (e.target as HTMLFormElement).reset();
                    }
                } catch (error) {
                    const err = error as Error;
                    console.log(err.message);
                } finally {
                    setRequestLoading(false);
                }
            }
        }, 1000)
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
            <h2 className="font-bold text-2xl text-center py-8">Book a Conference</h2>
            <form className="mx-auto max-w-4xl" onSubmit={handleSubmit}>
            <div className="flex sm:flex-row flex-col justify-between gap-2 py-2">
                  <span className="font-bold">Meeting Place :</span>                  
                  <div className="flex sm:flex-row flex-col justify-between sm:items-center md:gap-8 gap-4 w-full max-w-[35rem]">
                      <div className="flex items-center gap-2">
                          <input type="radio" name="meeting_place" id="vc-office" value={"VC Office"} defaultChecked={true} />
                          <label htmlFor="vc-office">VC Office</label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                          <input type="radio" name="meeting_place" id="conference-room-1" value={"Conference Room 1"} />
                          <label htmlFor="conference-room-1">Conference Room 1</label>
                      </div>

                      <div className="flex items-center gap-2">
                          <input type="radio" name="meeting_place" id="conference-room-2" value={"Conference Room 2"} />
                          <label htmlFor="conference-room-2">Conference Room 2</label>
                      </div>
                  </div>
              </div>

                <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-2 py-2">
                    <label htmlFor="name" className="font-bold">Name:</label>
                    <input type="text" className="w-full px-4 py-1 rounded-lg outline-none border border-gray-300 shadow-sm max-w-[35rem]" name="name" id="name" />
                </div>
                
                <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-2 py-2">
                    <label htmlFor="contact" className="font-bold">Contact:</label>
                    <input type="number" className="w-full px-4 py-1 rounded-lg outline-none border border-gray-300 shadow-sm max-w-[35rem]" name="contact" id="contact" />
                </div>
                
                <div className="flex sm:flex-row flex-col justify-between gap-2 py-2">
                    <label htmlFor="reason_of_meeting" className="font-bold">Reason of Meeting :</label>
                    <textarea className="w-full px-4 py-1 rounded-lg outline-none border border-gray-300 shadow-sm max-w-[35rem]" rows={5} name="reason_of_meeting" id="reason_of_meeting"></textarea>
                </div>
                
                <div className="flex sm:flex-row flex-col justify-between gap-2 py-2">
                    <label htmlFor="datetime" className="font-bold">Date & Time :</label>
                    <div className="w-full max-w-[35rem] flex justify-start items-center gap-4">
                        <span> {TimeAndDateToString()}</span>
                        <button type="button" onClick={() =>openModal({name: "time-picker"})} className="underline text-green-700 cursor-pointer"> Pick Time </button>
                    </div>
                </div>
                
                <div className="flex justify-end py-10">
                    <button disabled={requestLoading} className="bg-green-600 py-2 px-8 flex rounded-3xl text-white text-xl font-bold">
                        {requestLoading ? 'Please wait...' : 'Book Conference'}
                    </button>
                </div>
            </form>
        </div>
        </Header>
      </main>

    <Modal name="time-picker">
        <AppointmentTimePicker setDate={setDate} date={date}/>
    </Modal>
        
    </>
  )
}
