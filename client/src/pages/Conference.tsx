import Header from "../components/Header";

export default function Conference() {
  return (
    <>
      <main className='font-nunito min-h-screen'>
        <Header />
        <div className="p-4">
            <h2 className="font-bold text-2xl text-center py-8">Book a Conference</h2>
            <form className="mx-auto max-w-4xl">
            <div className="flex sm:flex-row flex-col justify-between gap-2 py-2">
                  <span className="font-bold">Meeting Place :</span>                  
                  <div className="flex sm:flex-row flex-col justify-between sm:items-center md:gap-8 gap-4 w-full max-w-[35rem]">
                      <div className="flex items-center gap-2">
                          <input type="radio" name="meeting_place" id="vc-office" value={"VC Office"} defaultChecked={true} />
                          <label htmlFor="vc-office">VC Office</label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                          <input type="radio" name="meeting_place" id="conference-room-1" value={"Conference Room 1"} />
                          <label htmlFor="conference-room-1">Conference Room 1</label>
                      </div>

                      <div className="flex items-center gap-2">
                          <input type="radio" name="meeting_place" id="conference-room-2" value={"Conference Room 2"} />
                          <label htmlFor="conference-room-2">Conference Room 2</label>
                      </div>
                  </div>
              </div>

                <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-2 py-2">
                    <label htmlFor="name" className="font-bold">Name:</label>
                    <input type="text" className="w-full px-4 py-1 rounded-lg outline-none border border-gray-300 shadow-sm max-w-[35rem]" name="name" id="name" />
                </div>
                
                <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-2 py-2">
                    <label htmlFor="contact" className="font-bold">Contact:</label>
                    <input type="number" className="w-full px-4 py-1 rounded-lg outline-none border border-gray-300 shadow-sm max-w-[35rem]" name="contact" id="contact" />
                </div>
                
                <div className="flex sm:flex-row flex-col justify-between gap-2 py-2">
                    <label htmlFor="reason_of_meeting" className="font-bold">Reason of Meeting :</label>
                    <textarea className="w-full px-4 py-1 rounded-lg outline-none border border-gray-300 shadow-sm max-w-[35rem]" rows={5} name="reason_of_meeting" id="reason_of_meeting"></textarea>
                </div>
                
                <div className="flex sm:flex-row flex-col justify-between gap-2 py-2">
                    <label htmlFor="datetime" className="font-bold">Date & Time :</label>
                    <div className="w-full max-w-[35rem] flex justify-start items-center gap-4">
                        <span> Monday, (10:00 am - 11.30 am) </span>
                        <span className="underline text-green-700 cursor-pointer"> Pick Time </span>
                    </div>
                </div>
                
                <div className="flex justify-end py-10">
                    <button className="bg-green-600 py-2 px-8 flex rounded-3xl text-white text-xl font-bold">Request Conference</button>
                </div>
            </form>
        </div>
      </main>
    </>
  )
}
