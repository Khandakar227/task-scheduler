import {  } from 'react'
import Modal from './components/Modal/Index'
import { openModal } from './components/Modal/modal'

function App() {
  return (
    <>
      <main className='font-nunito min-h-screen bg-1'>
        <div className='px-6 py-2 bg-green-600 drop-shadow-lg flex justify-start items-center gap-4'>
          <img className='w-8' src="/logo.png" alt="Logo" />
          <h1 className='text-xl font-semibold text-white'>IUT Administration Office</h1>
        </div>
        <div className='max-w-[600px] mx-auto min-h-[calc(100vh-95px)] h-full flex justify-center items-center'>
          <div>
            <p className='md:text-5xl text-3xl font-bold text-center text-white md:leading-[4.5rem]'>
              Welcome to <br/>
              IUT Administration Office<br/>
              Online Portal
            </p>
            <div className='md:pt-20 pt-10 flex md:flex-row flex-col justify-center items-center gap-8'>
                <button onClick={openModal} className='bg-green-600 py-3 px-8 flex rounded-3xl text-white text-xl font-bold'>Get Your Appointment</button>
                <button className='bg-green-600 py-3 px-8 flex rounded-3xl text-white text-xl font-bold'>Book Conference Room</button>
            </div>
          </div>
        </div>
      </main>
      <Modal/>
    </>
  )
}

export default App
