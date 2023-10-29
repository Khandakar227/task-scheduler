import { PDFViewer } from "@react-pdf/renderer";
import DLTPDF from "../components/DLTPDF";

export default function DLTPdfPage() {
  return (
    <>
        <PDFViewer style={{minHeight: '100vh', width: '100%'}}>
            <DLTPDF/>
        </PDFViewer>
    </>
  )
}
