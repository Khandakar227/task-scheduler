import { Link } from "react-router-dom";

const pdfLinks = [
    { href: "/pdf?upto=today", label: "Today" },
    { href: "/pdf?upto=7days", label: "7 days" },
    { href: "/pdf?upto=30days", label: "30 days" },
]
export default function GeneratePDFButton({type}:{type:'appointment'| 'conference' | "all"}) {

  return (
    <div className="group relative">
        <button className="p-2 bg-red-500 text-white text-xs sm:text-sm">Generate PDF</button>
         <div className="group-hover:grid hidden absolute bg-red-600 text-white right-0">
         {
            pdfLinks.map(pdflink =>
            <Link className="w-full px-4 py-1 border-b hover:bg-red-800" to={`${pdflink.href}&type=${type}`} target="_blank" key={pdflink.label}>{pdflink.label}</Link>
            )
        }
         </div>
    </div>
  )
}
