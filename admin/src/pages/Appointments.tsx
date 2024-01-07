import { useEffect, useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { APPOINMENTS_API_URL } from "../assets/config";
import RequestCard from "../components/RequestCard";
import { RequestProp } from "../libs/type";
import SearchBar from "../components/SearchBar";


export default function Appointments() {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState<RequestProp[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(`${APPOINMENTS_API_URL}`, {
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
                    (<p className="p-4 text-center">Loading...</p>)
                :
                    <div className="p-4 md:p-8 flex-auto min-h-screen bg-slate-100">
                            <SearchBar type={'appointment'}/>
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
