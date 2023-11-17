import { useEffect, useState } from "react"
import Header from "../components/Header"
import RequestCard from "../components/RequestCard"
import { REQUESTS_URL } from "../assets/config";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import DLTCard from "../components/DLTCard";
import { DLTFormData } from "../libs";

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

function AllRequests() {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState<(RequestProp | DLTFormData)[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(REQUESTS_URL, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.message);
                } else {
                    (data.data as RequestProp[]).sort((a, b) =>{
                        const da = new Date(a.createdAt);
                        const db = new Date(b.createdAt);
                        return db.getTime() - da.getTime();
                    } )
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
                                
                                    req.meeting_place == 'DLT Room' ?
                                    <DLTCard
                                    key={req._id}
                                    props={req as DLTFormData}
                                    />
                                    :
                                    <RequestCard
                                        date={(req as RequestProp).date}
                                        to={(req as RequestProp).appointment_with}
                                        name={(req as RequestProp).name}
                                        type={(req as RequestProp).appointment_with ? "appointment" : "booking"}
                                        startTime={(req as RequestProp).startTime}
                                        endTime={(req as RequestProp).endTime}
                                        meetingPlace={(req as RequestProp).meeting_place}
                                        reasonOfMeeting={(req as RequestProp).reason_of_meeting}
                                        status={(req as RequestProp).status}
                                        key={(req as RequestProp)._id}
                                    />
                            )
                        }
                    </div>
                }
                </div>
            </Header>
        </>
    )
}

export default AllRequests