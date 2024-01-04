import { FormEvent } from "react"

export default function SearchBar() {
    const onSearchHandler = (e:FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        console.log(data);
    }
  return (
    <form onSubmit={onSearchHandler} className="flex gap-4 justify-center items-center w-full max-w-2xl">
        <input type="search" name="searh" id="searh" placeholder="Search..." className="w-full py-1 px-2 rounded-md border" />
        <button type="submit" className="py-1 px-2 rounded-md bg-green-600 text-white"> Search </button>
    </form>
  )
}
