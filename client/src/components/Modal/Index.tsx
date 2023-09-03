import { useEffect, useState } from "react";
import { closeModal } from "./modal";

export default function Modal() {
  const [show, setShow] = useState(false);
 
  useEffect(() => {
    window.addEventListener('show-modal', () => setShow(true));
    window.addEventListener('hide-modal', () => setShow(false));
    return () => {
        window.removeEventListener('show-modal', () => setShow(true));
        window.removeEventListener('hide-modal', () => setShow(false));
    }
  }, [])
  
  return (
    <div className={`${show ? "opacity-1 z-50" : "opacity-0 -z-50"} transition-all duration-500 font-nunito text-center fixed w-screen min-h-screen flex justify-center items-center top-0 left-0`}>
      <div onClick={closeModal} className="linear-grad absolute top-0 left-0 right-0 bottom-0 w-screen max-w-full"></div>
        <div className="bg-white rounded-lg px-6 py-10 max-w-lg w-full z-10">
            <h2 className="text-2xl font-bold">Verify your Identity with IUT Email</h2>
            <div className="pt-10">
                <button className="bg-green-600 py-3 px-8 flex rounded-3xl text-white text-xl font-bold mx-auto"> Continue </button>
            </div>
        </div>
    </div>
  )
}
