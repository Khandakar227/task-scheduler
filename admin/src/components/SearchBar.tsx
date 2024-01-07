import { FormEvent } from "react"
import { useNavigate } from "react-router-dom";

export default function SearchBar({ type }:{type?: 'appointment' | 'conference' | 'dlt' | string}) {
    const navigate = useNavigate();
    
    const onSearchHandler = (e:FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        if (!data.search) return
        navigate(`/search?q=${data.search}&type=${type ? type : ""}`);  
    }
  return (
    <form onSubmit={onSearchHandler} className="flex gap-4 justify-center items-center w-full max-w-2xl">
        <input type="search" name="search" id="search" placeholder="Search..." className="w-full py-1 px-2 rounded-md border" />
        <button type="submit" className="py-1 px-4 rounded-md bg-green-600 text-white"> Search </button>
    </form>
  )
}
