import { PDFViewer } from "@react-pdf/renderer";
import PDF from "../components/PDF";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RequestProp, UptoType } from "../libs/type";
import { REQUEST_API_URL } from "../assets/config";


export default function PDFPage() {
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<RequestProp[]>([]);
  const [date, setDate] = useState("");
  const [upto, setUpto] = useState<UptoType>("");
  const [error, setError] = useState("");

  useEffect(() => {
      setLoading(true);
      const qp = new URLSearchParams(search);
      
      setUpto(qp.get("upto") as UptoType);
      const token = localStorage.getItem("access_token");
      fetch(`${REQUEST_API_URL}${search}`, {
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
                // Sorting based on submission
                  (data.data as RequestProp[]).sort((a, b) =>{
                      const da = new Date(a.createdAt);
                      const db = new Date(b.createdAt);
                      return db.getTime() - da.getTime();
                  } )
             
                  setRequests(data.data);
                  setDate(data.date);
                }

              console.log(data);
              setLoading(false);
          }).catch(err => {
              setError(err.message);
              setLoading(false);
          })
  }, [search])

  useEffect(() => {
      if(error) toast.error(error);
  }, [error])

  if(loading) return (<p className="text-center">Loading</p>)

  return (
    <>
        <PDFViewer style={{minHeight: '100vh', width: '100%'}}>
            <PDF upto={upto} date={date} requests={requests.filter(v => v.status == 'Approved')}/>
        </PDFViewer>
    </>
  )
}
