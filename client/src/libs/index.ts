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