import { FormEvent, useEffect, useState } from "react";
import Header from "../components/Header";
import { conferenceBookingHandler, dltBookingHandler, getDay, setTimeFormat } from "../libs";
import { toast } from "react-toastify";
import { openModal } from "../components/Modal/modal";
import Modal from "../components/Modal/Index";
import AppointmentTimePicker from "../components/AppointmentTimePicker";
import Loader from "../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import DLTForm from "../components/DLTForm";

const rooms = ['Board Room', 'Committee Room', 'DLT Room', 'VC Room' ];

export default function Conference() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [requestLoading, setRequestLoading] = useState(false);
    const [date, setDate] = useState({ startTime: "", endTime: "", date: "" });
    const [room, setRoom] = useState(rooms[0]);
    const { user, loading } = useUser();
    const navigate = useNavigate();

    const [techSupports, setTechSupports] = useState([] as string[]);
    const [logisticsSupports, setLogisticsSupports] = useState([] as string[]);
    const [refreshmentSupports, setRefreshmentSupports] = useState([] as string[]);
    const [officialCoverage, setOfficialCoverage] = useState([] as string[]);

    useEffect(() => {
        const token = queryParams.get("token")
        if(!token) return
        localStorage.setItem("access_token", token)
    }, [])

    useEffect(() => {
        if (loading) return;
        if (!user?.email) {
            toast.error("Unauhorized access, Please connect with your email.");
            navigate("/");
        }
    }, [user?.email, loading])


    useEffect(() => {
        console.log(techSupports)
    }, [techSupports])

    function TimeAndDateToString() {
        if (date.date && date.startTime && date.endTime)
            return `${getDay(date?.date)} (${setTimeFormat(date?.startTime, '12')} - ${setTimeFormat(date?.endTime, '12')})`;
        else return "";
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setRequestLoading(true);
        setTimeout(async () => {
            try {

                const formData = new FormData(e.target as HTMLFormElement);
                const data = Object.fromEntries(formData);
                if (room !== rooms[2]) {
                    // Show error if no date was selected
                    if (!(date.endTime && date.startTime && date.date)) {
                        toast.error("Select conference time", { theme: 'colored' });
                        setRequestLoading(false);
                    }
                    else {
                        const body = {
                            ...data,
                            ...date,
                        };
                        await conferenceBookingHandler(body, e);
                    }
                } else {
                    // DLT form handler
                    const body = {
                        ...data,
                        tech_supports: techSupports,
                        refreshment_supports: refreshmentSupports,
                        official_coverage: officialCoverage,
                        logistics_supports: logisticsSupports
                    };
                    await dltBookingHandler(body, e);
                }
            } catch (error) {
                const err = error as Error;
                setRequestLoading(false);
                console.log(err.message);
            } finally {
                setRequestLoading(false);
            }
        }, 1000)
    }

    if (loading) return (
        <>
            <main className='font-nunito min-h-screen'>
                <Header />
                <div className="min-h-[85vh] flex justify-center items-center">
                    <Loader />
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
                                    {
                                        rooms.map(r =>
                                            <div key={r} className="flex items-center gap-2">
                                                <input type="radio" name="meeting_place" onChange={() => setRoom(r)} id={r} value={r} defaultChecked={r == rooms[0]} />
                                                <label htmlFor={r}>{r}</label>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            {
                                room === rooms[2] ? <DLTForm
                                    techSupports={techSupports}
                                    refreshmentSupports={refreshmentSupports}
                                    logisticsSupports={logisticsSupports}
                                    officialCoverage={officialCoverage}
                                    setTechSupports={setTechSupports}
                                    setLogisticsSupports={setLogisticsSupports}
                                    setRefreshmentSupports={setRefreshmentSupports}
                                    setOfficialCoverage={setOfficialCoverage}
                                />
                                    :
                                    (
                                        <>
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
                                                    <button type="button" onClick={() => openModal({ name: "time-picker" })} className="underline text-green-700 cursor-pointer"> Pick Time </button>
                                                </div>
                                            </div>
                                        </>
                                    )
                            }

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
                <AppointmentTimePicker setDate={setDate} date={date} />
            </Modal>

        </>
    )
}
