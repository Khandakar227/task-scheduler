import { PropsWithChildren, useEffect, useState } from "react";
import { closeModal } from "./modal";

interface Props extends PropsWithChildren {
  name: string
}

export default function Modal(props:Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function showModal(data:CustomEventInit) {
      console.log(data)
      setShow(data.detail.name == props.name ? true: false);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function hideModal(data:any) {
      setShow(data.detail.name == props.name ? false : true);
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
      <div onClick={() =>closeModal({name: props.name})} className="linear-grad absolute top-0 left-0 right-0 bottom-0 w-screen max-w-full"></div>
        {props.children}
    </div>
  )
}
