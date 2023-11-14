import { FormEvent } from "react";
import { CONFERENCE_URL, DLT_URL } from "../assets/config";
import { toast } from "react-toastify";

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

export function setTimeFormat(time:string, format:'24'|'12' = '24') {
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

export async function conferenceBookingHandler(body: unknown, e: FormEvent) {
    const res = await fetch(`${CONFERENCE_URL}/create`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body),
    })
    const response = await res.json()
    if (response.error) toast.error(`Unexpected error occured: ${response.message}`);
    else {
        toast.success("A conference has been booked and awaited for review");
        (e.target as HTMLFormElement).reset();
    }
}


export async function dltBookingHandler(body: unknown, e: FormEvent) {
    console.log(body)
    const res = await fetch(`${DLT_URL}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body),
    })
    const response = await res.json()
    if (response.error) toast.error(`Unexpected error occured: ${response.message}`);
    else {
        toast.success("A DLT Room has been booked and awaited for review");
        (e.target as HTMLFormElement).reset();
    }
}

// DLT Form fields
export const tech_supports = [
    "Display",
    "Smart Board",
    "Projector",
    "Writing Board",
    "Microphone (Wireiess/Handhold)",
    "Laptop",
    "WiFi",
    "Technical Person",
    "Zoom Support (inform at least 5 days earlier for BdREN technical support)",
  ];
  
  export const logistics_supports = [
    'Font Desk with Table Cloth', 'Additional Chairs', 'Flower with vase', 'Others'
  ];
  
  export const refreshment_supports = [
    'Cafeteria Arrangement (Food and Services are arranged by particular Department/Office)',
    'Own Arrangement by Particular Deparlment/Office (Food and Services are arranged by particular Department/Oflice)'
  ];
  
  export const official_coverage = [
    'Photography', 'Video Recording'
  ];
  
  export const designation_posts = [
    "Faculty",
    "Department",
    "Office",
    "Centre",
    "Institute"
  ]