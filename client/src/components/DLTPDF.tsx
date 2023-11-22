import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { DLTFormData, extractTime, getDMYFormat } from "../libs";


Font.register({
    family: 'Noto Serif', fonts: [
        { src: 'http://fonts.gstatic.com/s/notoserif/v4/zW6mc7bC1CWw8dH0yxY8JfesZW2xOQ-xsNqO47m55DA.ttf' },
        { src: 'http://fonts.gstatic.com/s/notoserif/v4/lJAvZoKA5NttpPc9yc6lPQJKKGfqHaYFsRG-T3ceEVo.ttf', fontWeight: 700 },
    ]
});


const styles = StyleSheet.create({
    head: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 22,
        fontFamily: 'Noto Serif'
    },
    logo: {
        maxWidth: 70,
        maxHeight: 70
    },
    line: {
        borderBottom: '1px solid black',
        marginBottom: 5
    }
});

function getFlex (condition: boolean) {
    console.log(condition)
    if (condition) return ({flex: 'auto'})

}

export default function DLTPDF(props: DLTFormData) {

    return (
        <Document>
            <Page size="A4" style={{ flexDirection: 'column', backgroundColor: 'white', margin: 10, padding: 10, fontSize: 13, fontFamily: 'Noto Serif' }} wrap={true}>
                <View style={styles.head}>
                    <Image src={"logo.png"} style={styles.logo} />
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', fontWeight: 600, paddingBottom: 2 }}>ISLAMIC UNIVERSITY OF TECHNOLOGY (IUT)</Text>
                        <Text style={{ textAlign: 'center', fontWeight: 600, fontSize: '11px' }}>ORGANIZATION OF ISLAMIC COOPERATION (OIC)</Text>
                        <Text style={{ textAlign: 'center', fontWeight: 600, fontSize: '16px' }}>LIBRARY AND DOCUMENTATION OFFICE</Text>
                    </View>
                    <Image src={"oic-logo.png"} style={styles.logo} />
                </View>

                <Text style={{ paddingTop: 22, textAlign: 'center', fontWeight: 'semibold', fontSize: 11, textDecoration: 'underline' }}>Booking Form: Distance Learning Theatre (DLT) at the IUT Library</Text>

                <View style={{ border: '1px solid black', marginRight: 20, fontSize: 10, marginTop: 12, padding: 4 }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', gap: 24 }}>
                        <View style={{ flex: 'auto' }}>
                            <Text>Name: {props.name}</Text>
                            <View style={{ ...styles.line, marginLeft: 30 }}></View>
                        </View>
                        <View style={{ minWidth: 100 }}>
                            <Text>Date: {getDMYFormat(props.created_at)}</Text>
                            <View style={{ ...styles.line, marginLeft: 25 }}></View>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', gap: 12 }}>
                        <View style={{ flex: 'auto' }}>
                            <Text>Designation: {props.designation}</Text>
                            <View style={{ ...styles.line, marginLeft: 58 }} />
                        </View>
                        <View style={{ minWidth: 320 }}>
                            <Text>Faculty/Department/Office/Centre/Institute: {props.designation_post}</Text>
                            <View style={{ ...styles.line, marginLeft: 212 }}></View>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', gap: 12 }}>
                        <View style={{ flex: 'auto' }}>
                            <Text>Mobile no: {props.mobile_no}</Text>
                            <View style={{ ...styles.line, marginLeft: 52 }} />
                        </View>
                        <View style={{ minWidth: 320 }}>
                            <Text>Email: {props.email}</Text>
                            <View style={{ ...styles.line, marginLeft: 30 }}></View>
                        </View>
                    </View>

                    <Text style={{ paddingTop: 12 }}>Purpose of Booking (Official Meeting Purpose Only):</Text>
                    {
                        props.details ? 
                        <>
                            <View style={{ flex: 'auto', flexDirection: 'row', flexWrap: 'wrap', }}>
                                <Text>Details:{'  '}</Text>
                                {
                                    props?.details?.split(' ').map((w, i) => <Text key={`w-${w}`} style={{ ...styles.line, ...getFlex((i == props?.details?.split(' ').length - 1))}}> {w}</Text>)
                                }
                            </View>
        
                            {!(props?.details) || props?.details.length < 105 ?
                            <>
                                <View style={{...styles.line, marginTop: 12}} />
                                <View style={{...styles.line, marginTop: 12}} />
                            </>
                            : null}
                        </>
                        :
                        <View style={{flex: 'auto'}}>
                            <Text>Details: </Text>
                            <View style={{...styles.line, marginLeft: 40}} />
                            <View style={{...styles.line, paddingTop: 12}} />
                        </View>
                    }

                    <View>
                        <Text>Days of Booking (During working days and Office Time): {getDMYFormat(props.date_of_booking)}</Text>
                        <View style={{ ...styles.line, marginLeft: 266, maxWidth: 50 }}></View>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <View>
                            <Text>Time: {extractTime(props.start_time)}</Text>
                            <View style={{ ...styles.line, marginLeft: 30, minWidth: 50 }}></View>
                        </View>
                        <View>
                            <Text>to {extractTime(props.start_time)}</Text>
                            <View style={{ ...styles.line, marginLeft: 10, minWidth: 50 }}></View>
                        </View>
                        <Text> (am/pm), Tentative Duration of the Event:</Text>
                        <View style={{ ...styles.line, minWidth: 55 }}></View>
                    </View>

                    <Text style={{ fontWeight: 'bold', marginTop: 12 }}>a) Technical Support (required from ICT Centre):</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Text
                        style={{ border: '1px solid black', width: 9, height: 9,
                        backgroundColor: props?.tech_supports?.includes('Display') ? 'black' : 'white'
                        }}></Text>
                        <Text>Display,{'  '}</Text>

                        <Text
                        style={{ border: '1px solid black', width: 9, height: 9,
                        backgroundColor: props?.tech_supports?.includes('Smart Board') ? 'black' : 'white'
                        }}></Text>
                        <Text>Smart Board,{'  '}</Text>

                        <Text
                        style={{ border: '1px solid black', width: 9, height: 9,
                        backgroundColor: props?.tech_supports?.includes('Projector') ? 'black' : 'white'
                        }}></Text>
                        <Text>Projector,{'  '}</Text>

                        <Text
                        style={{ border: '1px solid black', width: 9, height: 9,
                        backgroundColor: props?.tech_supports?.includes('Writing Board') ? 'black' : 'white'
                        }}></Text>
                        <Text>Writing Board,{'  '}</Text>

                        <Text
                        style={{ border: '1px solid black', width: 9, height: 9,
                        backgroundColor: props?.tech_supports?.includes('Microphone (Wireiess/Handhold)') ? 'black' : 'white'
                        }}></Text>
                        <Text>Microphone (Wireless/Handhold),{'  '}</Text>

                        <Text
                        style={{ border: '1px solid black', width: 9, height: 9,
                        backgroundColor: props?.tech_supports?.includes('Laptop') ? 'black' : 'white'
                        }}></Text>
                        <Text>Laptop,{'  '}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text
                        style={{ border: '1px solid black', width: 9, height: 9,
                        backgroundColor: props?.tech_supports?.includes('WiFi') ? 'black' : 'white'
                        }}></Text>
                        <Text>WiFi,{'  '}</Text>

                        <Text
                        style={{ border: '1px solid black', width: 9, height: 9,
                        backgroundColor: props?.tech_supports?.includes('Technical Person') ? 'black' : 'white'
                        }}></Text>
                        <Text>Technical Person,{'  '}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text
                        style={{ border: '1px solid black', width: 9, height: 9,
                        backgroundColor: props?.tech_supports?.includes("Zoom Support (inform at least 5 days earlier for BdREN technical support)") ? 'black' : 'white'
                        }}></Text>
                        <Text>Zoom Support (inform at least 5 days earlier for BdREN technical support),{'  '}</Text>
                    </View>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                        <Text style={{ padding: 2, border: '1px solid black', width: 9, height: 9 }}></Text>
                        <View style={{ minWidth: 260 }}>
                            <Text>Other Support, If required: </Text>
                            <View style={{ ...styles.line, marginLeft: 127 }}></View>
                        </View>
                    </View>

                    <Text style={{ fontWeight: 'bold', marginTop: 8 }}>b) Logistics Support (required from Engineering Office):</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                        <Text
                            style={{ border: '1px solid black', width: 9, height: 9,
                            backgroundColor: props?.logistics_supports?.includes("Font Desk with Table Cloth") ? 'black' : 'white'
                        }}></Text>
                        <Text>Font Desk with Table Cloth,{'  '}</Text>

                        <Text
                        style={{ border: '1px solid black', width: 9, height: 9,
                        backgroundColor: props?.logistics_supports?.includes("Additional Chairs") ? 'black' : 'white'
                        }}></Text>
                        <Text>Additional Chairs,{'  '}</Text>

                        <Text
                            style={{ border: '1px solid black', width: 9, height: 9,
                            backgroundColor: props?.logistics_supports?.includes("Flowers with vase") ? 'black' : 'white'
                        }}></Text>
                        <Text>Flowers with vase,{'  '}</Text>

                        <Text
                            style={{ border: '1px solid black', width: 9, height: 9,
                            backgroundColor: props?.logistics_supports?.includes("Others") ? 'black' : 'white'
                        }}></Text>
                        <Text>Others, if{'  '}</Text>
                    </View>
                    <View style={{ minWidth: 260 }}>
                        <Text>required: {props?.logistics_support_reason}</Text>
                        <View style={{ ...styles.line, marginLeft: 45, maxWidth: 100 }}></View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 8 }}>
                        <Text style={{ fontWeight: 'bold' }}>c) Official Coverage:</Text>
                        <Text
                            style={{ border: '1px solid black', width: 9, height: 9,
                            backgroundColor: props?.official_coverage?.includes("Photography") ? 'black' : 'white'
                        }}></Text>
                        <Text>Photography,{'  '}</Text>

                        <Text
                            style={{ border: '1px solid black', width: 9, height: 9,
                            backgroundColor: props?.official_coverage?.includes("Video Recording") ? 'black' : 'white'
                        }}></Text>
                        <Text>Video Recording.{'  '}</Text>
                    </View>

                    <Text style={{ fontWeight: 'bold', marginTop: 8 }}>d) Refreshment Support at Executive Lounge at the Library:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Text
                            style={{ border: '1px solid black', width: 9, height: 9,
                            backgroundColor: props?.refreshment_supports?.includes("Cafeteria Arrangement (Food and Services are arranged by particular Department/Office)") ? 'black' : 'white'
                        }}></Text>
                        <Text>Cafeteria Arrrangement (Food and Services are arranged by particular Department/Office).</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 2 }}>
                        <Text
                            style={{ border: '1px solid black', width: 9, height: 9,
                            backgroundColor: props?.refreshment_supports?.includes("Own Arrangement by Particular Deparlment/Office (Food and Services are arranged by particular Department/Oflice)") ? 'black' : 'white'
                        }}></Text>
                        <Text style={{ maxWidth: 490 }}>Own Arrrangement by Particular Department/Office (Food and Services are arranged by particular Department/Office).</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 2, marginTop: 8 }}>
                        <Text
                            style={{ marginTop: 3, padding: 2, border: '1px solid black', width: 9, height: 9, backgroundColor: 'black' }}
                        ></Text>
                        <View style={{ width: '100%' }}>
                            <Text>Number of participants (Faculty Member/Head of Office) (maximum 20): {props.participants_count}</Text>
                            <View style={{ ...styles.line, marginLeft: 345, maxWidth: 80 }}></View>
                        </View>
                    </View>

                    <Text style={{ marginTop: 12, fontWeight: "bold", textDecoration: 'underline', marginBottom: 20 }}>N.B: Food and Beverage are not allowed inside the DLT Room.</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: '8 auto', gap: 150 }}>
                        <View>
                            <View style={{ ...styles.line, maxWidth: 130, marginBottom: 0 }}></View>
                            <Text style={{ fontWeight: 'bold' }}>Signature of the Applicant</Text>
                        </View>
                        <View>
                            <View style={{ ...styles.line, maxWidth: 130, marginBottom: 0 }}></View>
                            <Text style={{ fontWeight: 'bold' }}>Signature of the Head</Text>
                        </View>
                    </View>

                    <View style={{ ...styles.line }}></View>

                    <Text style={{ textDecoration: 'underline', marginBottom: 8 }}>For Library and Documentation Office:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Text style={{ padding: 2, border: '1px solid black', width: 9, height: 9 }}></Text>
                        <Text>Copy to the ICT Centre.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Text style={{ padding: 2, border: '1px solid black', width: 9, height: 9 }}></Text>
                        <Text>Copy to the Engineering Office.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Text style={{ padding: 2, border: '1px solid black', width: 9, height: 9 }}></Text>
                        <Text>Copy to the Cairman, Cafeteria, Committee.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Text style={{ padding: 2, border: '1px solid black', width: 9, height: 9 }}></Text>
                        <Text>Copy to the Audio Visual Instructor.</Text>
                    </View>
                    <Text style={{ marginLeft: 85 }}>-for taking necessary arrangement as per the requirement of the above event.</Text>
                    <Text style={{ marginTop: 8 }}>Copy to: PS to Vice-Chancelior: For the kind information of the Vice-Chancellor.</Text>
                    <Text style={{ marginTop: 8 }}>Remarks from Library and Documentation Office (if any):</Text>

                    <View style={{ flexDirection: 'row', marginTop: 8, marginBottom: 8 }}>
                        <Text>Prof. Dr. Khondokar Habibul Kabjr, Library in Charge:</Text>
                        <View style={{ marginLeft: 12 }}>
                            <Text>Signature: </Text>
                            <View style={{ ...styles.line, marginLeft: 45, minWidth: 70 }}></View>
                        </View>
                        <View>
                            <Text>, {'     '} Date: </Text>
                            <View style={{ ...styles.line, marginLeft: 45, minWidth: 60 }}></View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
