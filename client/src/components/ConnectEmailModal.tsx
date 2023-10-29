import { useEffect, useState } from "react";
import { APPOINTMENT_SIGNIN_URL, CONFERENCE_SIGNIN_URL } from "../assets/config";

type ModalDataType = "appointment"|"conference";

export default function ConnectEmailModal() {
    const [type, setType]= useState<ModalDataType>("appointment")
    
    useEffect(() => {
        function showModal(data:CustomEventInit) {
            setType(data?.detail?.type as ModalDataType || type);
        }
    
        window.addEventListener('show-modal', showModal);
        return () => {
            window.removeEventListener('show-modal', showModal);
        }
      }, [])

    return (
    <div className="bg-white rounded-lg px-6 py-10 max-w-lg w-full z-10">
        <h2 className="text-2xl font-bold">Verify your Identity with your Email</h2>
        <div className="pt-10">
            <a href={type == 'appointment' ? APPOINTMENT_SIGNIN_URL : CONFERENCE_SIGNIN_URL}>
                <button className="bg-green-600 py-3 px-8 flex rounded-3xl text-white text-xl font-bold mx-auto"> Continue </button>
            </a>
        </div>
    </div>
  )
}
