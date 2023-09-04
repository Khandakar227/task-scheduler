import { useEffect, useState } from "react";
import { closeModal } from "./modal";
import { APPOINTMENT_SIGNIN_URL, CONFERENCE_SIGNIN_URL } from "../../assets/config";

type ModalDataType = "appointment"|"conference";

export default function Modal() {
  const [show, setShow] = useState(false);
  const [type, setType]= useState<ModalDataType>("appointment")

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function showModal(data:any) {
      setShow(true);
      console.log(data?.detail?.type)
      setType(data?.detail?.type as ModalDataType || type);
    }
    function hideModal() {
      setShow(false);
    }

    window.addEventListener('show-modal', showModal);
    window.addEventListener('hide-modal', hideModal);
    return () => {
        window.removeEventListener('show-modal', showModal);
        window.removeEventListener('hide-modal', hideModal);
    }
  }, [])
  
  return (
    <div className={`${show ? "opacity-1 z-50" : "opacity-0 -z-50"} transition-all duration-500 font-nunito text-center fixed w-screen min-h-screen flex justify-center items-center top-0 left-0`}>
      <div onClick={() =>closeModal()} className="linear-grad absolute top-0 left-0 right-0 bottom-0 w-screen max-w-full"></div>
        <div className="bg-white rounded-lg px-6 py-10 max-w-lg w-full z-10">
            <h2 className="text-2xl font-bold">Verify your Identity with IUT Email</h2>
            <div className="pt-10">
                <a href={type == 'appointment' ? APPOINTMENT_SIGNIN_URL : CONFERENCE_SIGNIN_URL}>
                  <button className="bg-green-600 py-3 px-8 flex rounded-3xl text-white text-xl font-bold mx-auto"> Continue </button>
                </a>
            </div>
        </div>
    </div>
  )
}
