import {  } from 'react'
import Modal from '../components/Modal/Index'
import { openModal } from '../components/Modal/modal'
import Header from '../components/Header'
import ConnectEmailModal from '../components/ConnectEmailModal'

function Home() {
  return (
    <>
      <main className='font-nunito min-h-screen bg-1'>
      <Header />
        <div className='max-w-[600px] mx-auto min-h-[calc(100vh-95px)] h-full flex justify-center items-center'>
          <div>
            <p className='md:text-5xl text-3xl font-bold text-center text-white md:leading-[4.5rem]'>
              Welcome to <br/>
              IUT Administration Office<br/>
              Online Portal
            </p>
            <div className='md:pt-20 pt-10 flex md:flex-row flex-col justify-center items-center gap-8'>
                <button onClick={() => openModal({name:'connect-email', type: 'appointment'})} className='bg-green-600 py-3 px-8 flex rounded-3xl text-white text-xl font-bold'>Get Your Appointment</button>
                <button onClick={() => openModal({name:'connect-email', type: 'conference'})} className='bg-green-600 py-3 px-8 flex rounded-3xl text-white text-xl font-bold'>Book Conference Room</button>
            </div>
          </div>
        </div>
      </main>
      <Modal name='connect-email'>
        <ConnectEmailModal/>
      </Modal>
    </>
  )
}

export default Home
