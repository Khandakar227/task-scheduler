import { DLTFormData, getDMYFormat, setTimeFormat } from "../libs";

export default function DLTFormInfo({props}:{props:DLTFormData}) {
  return (
    <div className="px-4 py-2 rounded shadow bg-white">
        <p className="border-b py-1">Name: <span className="font-medium"> {props?.name} </span></p>
        <p className="border-b py-1">Email: <span className="font-medium"> {props?.email} </span></p>
        <p className="border-b py-1">Mobile no.: <span className="font-medium"> {props?.mobile_no} </span></p>
        <p className="border-b py-1">Submitted on: <span className="font-medium"> {getDMYFormat(props?.created_at)} </span></p>
        <p className="border-b py-1">Designation post: <span className="font-medium"> {props?.designation_post} </span></p>
        <p className="border-b py-1">Designation: <span className="font-medium"> {props.designation} </span></p>
        <p className="border-b py-1">Details: <span className="font-medium"> {props.details} </span></p>
        <p className="border-b py-1">
          Meeting date: <span className="font-medium"> {getDMYFormat(props.date_of_booking)} </span>
          from <span className="font-medium">{setTimeFormat(props.start_time, '12')} </span>
          to <span className="font-medium">{setTimeFormat(props.end_time, '12')}</span>
        </p>
        <p className="border-b py-1">Tentative Duration: <span className="font-medium"> {props.duration} hr </span></p>
        <p> Number of participants (Faculty Member/Head of Office): <span className="font-medium">{props.participants_count}</span> </p>
    </div>
  )
}
