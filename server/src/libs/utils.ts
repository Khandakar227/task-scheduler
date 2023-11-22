export function YYYYMMDD(_date:string | Date) {
    const date = new Date(_date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

export const DDMMYYYY = (date:string | Date, monthFormat: 'number' | 'short' = 'number') => {
    let m:string;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = new Date(date);
    const y = d.getFullYear();
    
    if(monthFormat == 'number')
      m = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    else
      m = months[d.getMonth()];

    const day = String(d.getDate()).padStart(2, '0');
    return `${day}-${m}-${y}`;
}

export const timeToDate = (date: string, time: string) => {
  return new Date(`${date}T${time}`);
}

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

export function extractTime(date: string | Date) {
  const d = new Date(date);
  return setTimeFormat(`${d.getHours()}:${d.getMinutes()}`, '12');
}