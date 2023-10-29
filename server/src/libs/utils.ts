export function YYYYMMDD(_date:string | Date) {
    const date = new Date(_date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

export const DDMMYYYY = (date:string | Date) => {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}-${m}-${y}`;
}