import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { RequestProp } from "../libs/type";
import { DLTFormData } from "../libs";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { APPOINMENTS_API_URL, CONFERENCES_API_URL, REQUEST_API_URL } from "../assets/config";
import RequestCard from "../components/RequestCard";
import DLTCard from "../components/DLTCard";

export default function Search() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<(RequestProp|DLTFormData)[]>([]);
  const [error, setError] = useState("");

  const getParams = (queryString:string) => {
    const urlSearchParam = new URLSearchParams(queryString);
    const q = urlSearchParam.get('q');
    const type = urlSearchParam.get('type');
   
    return {q, type}
  }

  useEffect(() => {
    setLoading(true);
    
    const {q, type} = getParams(location.search);
    
    const url = type == 'appointment' ? APPOINMENTS_API_URL : type == 'conference' ? CONFERENCES_API_URL : REQUEST_API_URL;
    const urlSearchParam = new URLSearchParams({q: q as string})
    
    const token = localStorage.getItem("access_token");
    fetch(`${url}/search?${urlSearchParam.toString()}`, {
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
        console.log(data.data); 
        setRequests(data.data);
      }
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
  })

  }, [location.search])

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
              <SearchBar />
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
