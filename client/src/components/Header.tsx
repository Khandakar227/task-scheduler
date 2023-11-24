import { useState } from 'react'
import { PropsWithChildren } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi'
import { FaUserPlus, FaBorderAll, FaCalendarPlus, FaCalendarCheck } from 'react-icons/fa';
import { VscNewFile } from 'react-icons/vsc'
import { Link } from "react-router-dom";
import { USER_URL } from '../assets/config';

interface HeaderProps extends PropsWithChildren {
  disableSidebar?:boolean
}

function Header({children, disableSidebar}:HeaderProps) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  const onMenuButtonClick = () => {
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <>
      <div className='px-6 py-2 bg-green-600 drop-shadow-lg static'>
        <div className="flex items-center justify-between max-w-5xl">
            <Link to={"/"} className="inline-flex justify-start items-center gap-4">
                <img className='w-8' src="/logo.png" alt="Logo" />
                <h1 className='text-base sm:text-xl font-semibold text-white'>IUT Administration Office</h1>
            </Link>
            {!disableSidebar &&
            (<button className='text-white block lg:hidden' onClick={onMenuButtonClick}><AiOutlineMenu size={24}/></button>)}
        </div>
      </div>
        {
          !disableSidebar &&
          (
          <div className='flex justify-between'>
            <Sidebar sidebarVisible={sidebarVisible}/>
            {children}
          </div>
          )}
    </>
  )
}

export default Header

function Sidebar({sidebarVisible}:{sidebarVisible:boolean}) {

  const logOut = async () => {
    fetch(`${USER_URL}/logout`, {method: 'GET', credentials: 'include'})
    .then(res => res.json())
    .then(d => {
      console.log(d);
      location.href = "/";
    }).catch(e => console.log(e));
  }

  return (
    <>
      <div className={`${sidebarVisible ? "translate-x-0" : "-translate-x-full"} transition-transform lg:z-10 lg:translate-x-0 fixed top-0 lg:static shadow left-0 bg-white p-6 max-w-[260px] w-full min-h-screen`}>
        <ul>
          <li className='font-bold pt-4'>
            <Link to={"/all-requests"} className='text-sm flex gap-4 w-full p-2 hover:bg-green-600 hover:text-white transition-all'>
              <FaBorderAll />
              <span>All Requests</span>
            </Link>
          </li>

          <li className='font-bold pt-4'>
            <Link to={"/appointment"} className='text-sm flex gap-4 w-full p-2 hover:bg-green-600 hover:text-white transition-all'>
              <VscNewFile />
              <span>New Appointment</span>
            </Link>
          </li>

          <li className='font-bold pt-4'>
            <Link to="/appointments" className='text-sm flex gap-4 w-full p-2 hover:bg-green-600 hover:text-white transition-all'>
              <FaUserPlus />
              <span>Appointments</span>
            </Link>
          </li>

          <li className='font-bold pt-4'>
            <Link to={"/conference"} className='text-sm flex gap-4 w-full p-2 hover:bg-green-600 hover:text-white transition-all'>
              <FaCalendarPlus/>
              <span>New Room Booking</span>
            </Link>
          </li>

          <li className='font-bold pt-4'>
            <Link to="/conferences" className='text-sm flex gap-4 w-full p-2 hover:bg-green-600 hover:text-white transition-all'>
              <FaCalendarCheck/>
              <span>Room bookings</span>
            </Link>
          </li>

          <li className='font-bold pt-4'>
            <Link to="/dlt" className='text-sm flex gap-4 w-full p-2 hover:bg-green-600 hover:text-white transition-all'>
              <FaCalendarCheck/>
              <span>DLT Room Bookings</span>
            </Link>
          </li>

          <li className='font-bold pt-4'>
            <button onClick={logOut} className='text-sm flex gap-4 w-full p-2 hover:bg-green-600 hover:text-white transition-all'>
              <BiLogOut/>
              <span>Log Out</span>
            </button>
          </li>

        </ul>
      </div>
    </>
  )
}