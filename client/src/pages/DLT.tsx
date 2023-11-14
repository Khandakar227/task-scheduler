import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DLT_URL } from "../assets/config";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { DLTFormData } from "../libs";
import DLTCard from "../components/DLTCard";

export default function DLT() {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState<DLTFormData []>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(DLT_URL, {
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
                console.log(data);
                setLoading(false);
            }).catch(err => {
                setError(err.message);
                setLoading(false);
            })
    }, [])

    useEffect(() => {
        if (error) toast.error(error);
    }, [error])

    return (
        <>
            <Header>
                <div className="mx-auto w-full flex justify-center items-center">
                    {loading ?
                        (<Loader />)
                        :
                        <div className="p-4 md:p-8 flex-auto min-h-screen bg-slate-100">
                            {
                                requests.map(req => 
                                    <DLTCard props={req} key={req._id} />
                                    )
                            }
                        </div>
                    }
                </div>
            </Header>
        </>
    )
}
