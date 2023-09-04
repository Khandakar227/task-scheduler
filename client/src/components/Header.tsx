import { Link } from "react-router-dom"

function Header() {
  return (
    <div className='px-6 py-2 bg-green-600 drop-shadow-lg'>
        <Link to={"/"} className="inline-flex justify-start items-center gap-4">
            <img className='w-8' src="/logo.png" alt="Logo" />
            <h1 className='text-xl font-semibold text-white'>IUT Administration Office</h1>
        </Link>
    </div>
  )
}

export default Header