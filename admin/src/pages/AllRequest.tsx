import { useEffect, useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { REQUEST_API_URL } from "../assets/config";
import RequestCard from "../components/RequestCard";
import { RequestProp } from "../libs/type";
import GeneratePDFButton from "../components/GeneratePDFButton";
import DLTCard from "../components/DLTCard";
import { DLTFormData } from "../libs";
import SearchBar from "../components/SearchBar";

    
export default function AllRequest() {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState<(RequestProp|DLTFormData)[]>([]);
    const [error, setError] = useState("");


    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        fetch(`${REQUEST_API_URL}`, {
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
                    setRequests(data.data);
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
                    <div className="flex-auto min-h-screen bg-slate-100 pb-16 px-3">
                       <div className="text-end py-4 px-2">
                            <div className="flex gap-4 justify-between items-center">
                                <SearchBar />
                                <GeneratePDFButton type="all"/>
                            {/* <Link to={"/pdf"} target="_blank" className="rounded px-4 py-2 bg-red-600 text-white">Generate PDF</Link> */}
                            </div>
                       </div>
                        {
                            requests.map(req => 
                                req.meeting_place == 'DLT Room' ?
                                <DLTCard
                                key={req._id}
                                props={req as DLTFormData}
                                />
                                    :
                                <RequestCard
                                key={req._id}
                                {...req as RequestProp}
                                type={(req as RequestProp).appointment_with ? "appointment" : "booking"}
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
