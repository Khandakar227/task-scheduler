import { Dispatch, FormEvent, SetStateAction, useRef } from "react";
import { closeModal } from "./Modal/modal";

type AppointmentDate = {
    startTime: string;
    endTime: string;
    date: string;
}
type Props = {
    date: AppointmentDate;
    setDate: Dispatch<SetStateAction<AppointmentDate>>;
}

export default function AppointmentTimePicker(props:Props) {
    // const [startTime, setStartTime] = useState('');
    const startTimeRef = useRef({} as HTMLInputElement);
    const endTimeRef = useRef({} as HTMLInputElement);

    function handleTimePicker(e:FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        props.setDate(data as AppointmentDate);
        closeModal({name: 'time-picker'});
    }

    function getMaxDate() {
        const current = new Date();
        current.setDate(current.getDate() + 60)
        return current.toISOString().split('T')[0]
    }
    
    // function getCurrentTime(format = '24') {
    //     const ct = new Date();
    //     const h = ct.getHours();
    //     const m = ct.getMinutes();
    //     const ampm = h >= 12 ? 'PM' : 'AM';
    //     const formattedHours = h % 12 || 12; // Ensure 12-hour format, not 0 AM or 0 PM
    //     const formattedMinutes = m < 10 ? `0${m}` : m;
    //     if (format == '24') return `${h}:${formattedMinutes}`;
    //     else return `${formattedHours}:${formattedMinutes} ${ampm}`;
    // }

    return (
    <form onSubmit={handleTimePicker} className="p-4 rounded-lg bg-white shadow border max-w-[250px] z-10 text-left">
        <div className="py-3">
            <label className="text-xs" htmlFor="date">Select a date</label>
            <input
                className="w-full border rounded-md my-1 outline-none focus:outline-gray-200"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                max={getMaxDate()}
                onChange={e=> props.setDate(d => ({...d, date: e.target.value}))} 
                name="date"
                id="date"
                required
                />
        </div>
        <div className="py-3 relative pr-4">
            <label className="text-xs" htmlFor="start-time">Starting time</label>
            <input
                className="w-full border rounded-md my-1 outline-none focus:outline-gray-200"
                ref={startTimeRef}
                type="time"
                name="startTime"
                id="start-time"
                value={props.date?.startTime}
                onChange={e=> props.setDate(d => ({...d, startTime: e.target.value}))}
                required
            />
        </div>
        <div className="py-3 relative pr-4">
            <label className="text-xs" htmlFor="end-time">Ending time</label>
            <input
                className="w-full border rounded-md my-1 outline-none focus:outline-gray-200"
                ref={endTimeRef}
                type="time"
                min={props.date?.startTime}
                onChange={e=> props.setDate(d => ({...d, endTime: e.target.value}))}
                name="endTime" 
                id="end-time"
                required
                />
        </div>
        <button className="py-2 w-full bg-green-600 rounded-md text-white">Confirm</button>
    </form>
  )
}
