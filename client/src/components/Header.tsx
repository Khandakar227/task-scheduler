import { useState } from 'react'
import { PropsWithChildren } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserPlus, FaBorderAll, FaCalendarPlus, FaCalendarCheck } from 'react-icons/fa';
import { Link } from "react-router-dom";

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
          <div className='flex justify-between gap-2'>
            <Sidebar sidebarVisible={sidebarVisible}/>
            {children}
          </div>
          )}
    </>
  )
}

export default Header

function Sidebar({sidebarVisible}:{sidebarVisible:boolean}) {
  return (
    <>
      <div className={`${sidebarVisible ? "translate-x-0" : "-translate-x-full"} transition-transform lg:z-10 lg:translate-x-0 fixed top-0 lg:static shadow left-0 bg-white p-6 max-w-[280px]  min-h-screen`}>
        <ul>
          <li className='font-bold pt-4'>
            <button className='flex gap-4 w-full p-2 hover:bg-green-600 hover:text-white transition-all'>
              <FaBorderAll />
              <span>All Appointments</span>
            </button>
          </li>
          <li className='font-bold pt-4'>
            <button className='flex gap-4 w-full p-2 hover:bg-green-600 hover:text-white transition-all'>
              <FaUserPlus />
              <span>Take Appointment</span>
            </button>
          </li>
          <li className='font-bold pt-4'>
            <button className='flex gap-4 w-full p-2 hover:bg-green-600 hover:text-white transition-all'>
              <FaCalendarPlus/>
              <span>Room booking</span>
            </button>
          </li>
          <li className='font-bold pt-4'>
            <button className='flex gap-4 w-full p-2 hover:bg-green-600 hover:text-white transition-all'>
              <FaCalendarCheck/>
              <span>Check request</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}