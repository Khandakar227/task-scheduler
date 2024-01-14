import { useEffect, useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { CONFERENCES_API_URL } from "../assets/config";
import RequestCard from "../components/RequestCard";
import SearchBar from "../components/SearchBar";

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
    

export default function Conferences() {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState<RequestProp[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        fetch(`${CONFERENCES_API_URL}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token as string
              }
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
                    (<p className="p-4 text-center">Loading...</p>)
                :
                    <div className="p-4 md:p-8 flex-auto min-h-screen bg-slate-100">
                            <SearchBar type={'conference'}/>
                        {
                            requests.map(req => 
                            <RequestCard
                            key={req._id}
                            {...req}
                            type={req.appointment_with ? "appointment" : "booking"}
                            />)
                        }
                    </div>
                }
                </div>
        </Header>
    </>
  )
}
