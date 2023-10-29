import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { RequestProp, UptoType } from '../libs/type';
import { setTimeFormat } from '../libs';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: 'white',
      margin: 10,
      padding: 10,
      fontSize: 11
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16
    },
    logo: {
        maxWidth: 30,
        maxHeight: 30
    }
  });

  export default function PDF(props:{requests:RequestProp [], date:string, upto: UptoType}) {
    const [requests, setRequests] = useState([] as RequestProp []);
   
    useEffect(() => {
        setRequests(props.requests);
    }, [props.requests]);

    const DDMMYYYY = (date:string | Date) => {
        const d = new Date(date);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(d.getDate()).padStart(2, '0');
        return `${day}-${m}-${y}`;
    }
    return (
    <>
        <Document>
            <Page size="A4" style={styles.page} wrap={true}>
                <View style={styles.head}>
                    <Image src={"logo.png"} style={styles.logo}/>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={{textAlign: 'center'}}>ISLAMIC UNIVERSITY OF TECHNOLOGY</Text>
                        <Text style={{textAlign: 'center'}}>ORGANIZATION OF ISLAMIC COOPERATION (OIC)</Text>
                    </View>
                    <Image src={"oic-logo.png"} style={styles.logo}/>
                </View>

                <View style={{paddingTop: '24px'}}>
                    <Text>Date: {props.date}</Text>
                </View>

                <View style={{padding: '24px 0px'}}>
                    {
                        requests.map((req,i) => (
                            <View key={req._id} style={{flexDirection: 'row', alignItems: 'stretch', width: '100%'}}>
                                <Text style={{padding: '12px 8px', border: '1px solid black'}}>{i+1}.</Text>
                                <View style={{padding: '12px 8px', border: '1px solid black', maxWidth: '400rem', width: '100%'}}>
                                    <Text>
                                    {
                                    req.appointment_with ?
                                        `Appointment Request for ${req.appointment_with}`
                                        : 
                                        `Room Booking Request for ${req.meeting_place}`
                                    }
                                    </Text>
                                    <Text>From {req.name}</Text>
                                    {req.appointment_with && (<Text>Meeting place: {req.meeting_place}</Text>)}
                                </View>
                                <View style={{padding: '12px 4px', border: '1px solid black', maxWidth: '120rem', width: '100%'}}>
                                    {
                                        props.upto != 'today' ?
                                    <Text style={{textAlign:'center'}}>
                                        {DDMMYYYY(req.date)}
                                    </Text>
                                    : ""
                                    }
                                    <Text style={{textAlign:'center'}}>
                                        {setTimeFormat(req.startTime, '12')} - {setTimeFormat(req.endTime, '12')}
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </Page>
        </Document>
    </>
  )
}
