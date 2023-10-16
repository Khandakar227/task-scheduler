import { useEffect, useState } from "react"
import Header from "../components/Header"
import RequestCard from "../components/RequestCard"
import { APPOINTMENT_URL } from "../assets/config";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

type RequestProp = {
name: string,
email: string,
contact: string,
appointment_with: string,
reason_of_meeting: string,
meeting_place: string,
date: string,
startTime: string,
endTime: string,
createdAt: string,
status: "Approved" | "Declined" | "Pending",
_id:string
}

function Appointments() {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState<RequestProp[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(APPOINTMENT_URL, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.message);
                } else {
                    setRequests(data.data)
                }
                console.log(data)
                setLoading(false);
            }).catch(err => {
                setError(err.message);
                setLoading(false);
            })
    }, [])

    useEffect(() => {
        if(error) toast.error(error);
    }, [error])
    return (
        <>
            <Header>
                <div className="mx-auto w-full flex justify-center items-center">
                    {loading ?
                    (<Loader/>)
                :
                    <div className="p-4 md:p-8 flex-auto min-h-screen bg-slate-100">
                        {
                            requests.map(req => 
                            <RequestCard
                                date={req.date}
                                to={req.appointment_with}
                                name={req.name}
                                type={req.appointment_with ? "appointment" : "booking"}
                                startTime={req.startTime}
                                endTime={req.endTime}
                                meetingPlace={req.meeting_place}
                                reasonOfMeeting={req.reason_of_meeting}
                                status={req.status}
                                key={req._id}
                            />)
                        }
                    </div>
                }
                </div>
            </Header>
        </>
    )
}

export default Appointments;