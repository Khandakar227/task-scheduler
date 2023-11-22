import { AiOutlineDownload } from 'react-icons/ai'
import { DLTFormData, extractTime, getDMYFormat } from "../libs"
import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DLTPDF from './DLTPDF';


function DLTCard({props}:{props:DLTFormData}) {
    const [showDetails, setShowDetails] = useState(false);

    function onShowDetails() {
        setShowDetails(!showDetails);
    }
    return (
        <div className='py-4'>

            <div className="p-4 shadow rounded bg-white border-green-500 border-b-4">
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
                    <PDFDownloadLink document={<DLTPDF {...props} />} fileName={`${props._id}_${props.created_at}.pdf`} className='px-2 py-1 rounded-sm flex gap-2 bg-red-600 text-white'>
                        <span className='text-sm font-medium'>Download PDF</span>
                        <AiOutlineDownload size={24}/>
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
  )
}

export default DLTCard