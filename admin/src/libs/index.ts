import { NOTIFY_API_URL } from "../assets/config";

export type DLTFormData = {
    _id: string,
    name: string,
    email: string,
    designation: string,
    designation_post: string,
    mobile_no: string,
    details: string,
    date_of_booking: string,
    start_time: string,
    end_time: string,
    duration: number,
    tech_supports: string[],
    logistics_supports: string[],
    logistics_support_reason?: string,
    official_coverage: string[],
    refreshment_supports: string[],
    meeting_place: string,
    participants_count: number,
    created_at: string,
    __v: string
};

export function setTimeFormat(time:string, format = '24') {
    if (!time.trim()) return "";
    const t = time.split(":");
    const h = +t[0];
    const m = +t[1];
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 || 12; // Ensure 12-hour format, not 0 AM or 0 PM
    const formattedMinutes = m < 10 ? `0${m}` : m;
    if (format == '24') return `${h}:${formattedMinutes}`;
    else return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export function getDay(date: string) {
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (!date.trim) return "";
    return DAYS[(new Date(date)).getDay()];
}

export function getDMYFormat(date: string) {
    function pad(s:number) { return (s < 10) ? '0' + s : s; }

    const d = new Date(date);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}

export function extractTime(date: string) {
    const d = new Date(date);
    return setTimeFormat(`${d.getHours()}:${d.getMinutes()}`, '12');
}

export async function notifyUser (email:string, username: string, date:string, startTime: string, endTime: string, type: 'Appointment'|'Conference') {
    const data = {
        email,
        username,
        date,
        startTime,
        endTime,
        type,
    };
    const response = await fetch(NOTIFY_API_URL, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
   const res = await response.json();
   if(res.error) throw new Error(res.message);
}