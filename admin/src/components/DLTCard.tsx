import { DLTFormData, extractTime, getDMYFormat } from "../libs"
import { useState } from 'react';
import DLTFormInfo from "./DLTFormInfo";

function DLTCard({props}:{props:DLTFormData}) {
    const [showDetails, setShowDetails] = useState(false);
    const [showFullInfo, setShowFullInfo] = useState(false);

    function onShowDetails() {
        setShowDetails(!showDetails);
    }
    function viewFullInfo() {
        setShowFullInfo(!showFullInfo);
    }
    function hideDetailsModal() {
        setShowFullInfo(false);
    }

    return (
    <>
    <div className="py-4">

        <div className="p-4 shadow rounded bg-white border-green-500 border-b-4">
            <h1 className="font-bold pb-1 text-lg text-green-600">DLT Room</h1>
            <h1 className="text-lg font-semibold pb-2">Booked for: {getDMYFormat(props.date_of_booking)}</h1>
            <div className="md:flex gap-8">
                <p>Start time: {extractTime(props.start_time)}</p>
                <p>End time: {extractTime(props.end_time)}</p>
                <p>Duration: {props.duration}hr</p>
            </div>
            {
                showDetails && (
                <div className='py-4'>
                    <p className='whitespace-pre-wrap'>{props.details}</p>
                </div>
                )
            }

            <div className='pt-4 flex gap-4'>
                <button onClick={onShowDetails} className='bg-green-600 text-white rounded py-1 px-4 text-sm font-medium'> {showDetails ? 'Hide details' : 'Show details'} </button>
                <button className='bg-blue-600 text-white rounded py-1 px-4 text-sm font-medium' onClick={viewFullInfo}>View full info</button>
            </div>
        </div>
        <div className={`fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-black bg-opacity-30 flex justify-center items-center ${showFullInfo ? 'z-20': '-z-20'}`}>
            <div className="absolute top-0 left-0 right-0 bottom-0 h-screen w-screen z-0" onClick={hideDetailsModal}></div>
            <div className="z-10">
                <DLTFormInfo props={props} />
            </div>
        </div>
    </div>
    </>
  )
}

export default DLTCard