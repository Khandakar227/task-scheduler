"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTime = exports.setTimeFormat = exports.timeToDate = exports.DDMMYYYY = exports.YYYYMMDD = void 0;
function YYYYMMDD(_date) {
    const date = new Date(_date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
exports.YYYYMMDD = YYYYMMDD;
const DDMMYYYY = (date, monthFormat = 'number') => {
    let m;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = new Date(date);
    const y = d.getFullYear();
    if (monthFormat == 'number')
        m = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    else
        m = months[d.getMonth()];
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}-${m}-${y}`;
};
exports.DDMMYYYY = DDMMYYYY;
const timeToDate = (date, time) => {
    return new Date(`${date}T${time}`);
};
exports.timeToDate = timeToDate;
function setTimeFormat(time, format = '24') {
    if (!time.trim())
        return "";
    const t = time.split(":");
    const h = +t[0];
    const m = +t[1];
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 || 12; // Ensure 12-hour format, not 0 AM or 0 PM
    const formattedMinutes = m < 10 ? `0${m}` : m;
    if (format == '24')
        return `${h}:${formattedMinutes}`;
    else
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
exports.setTimeFormat = setTimeFormat;
function extractTime(date) {
    const d = new Date(date);
    return setTimeFormat(`${d.getHours()}:${d.getMinutes()}`, '12');
}
exports.extractTime = extractTime;
