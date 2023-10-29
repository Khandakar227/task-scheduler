import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";


Font.register({ family: 'Noto Serif', fonts: [
    { src: 'http://fonts.gstatic.com/s/notoserif/v4/zW6mc7bC1CWw8dH0yxY8JfesZW2xOQ-xsNqO47m55DA.ttf' },
    { src: 'http://fonts.gstatic.com/s/notoserif/v4/lJAvZoKA5NttpPc9yc6lPQJKKGfqHaYFsRG-T3ceEVo.ttf', fontWeight: 700 },
]});

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

export default function DLTPDF() {
  return (
    <>
      <Document>
        <Page size="A4" style={{flexDirection: 'column', backgroundColor: 'white', margin: 10, padding: 10, fontSize: 13, fontFamily: 'Noto Serif'}} wrap={true}>
            <View style={styles.head}>
                <Image src={"logo.png"} style={styles.logo}/>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Text style={{textAlign: 'center', fontWeight: 600, paddingBottom: 2}}>ISLAMIC UNIVERSITY OF TECHNOLOGY (IUT)</Text>
                    <Text style={{textAlign: 'center', fontWeight: 600, fontSize: '11px'}}>ORGANIZATION OF ISLAMIC COOPERATION (OIC)</Text>
                    <Text style={{textAlign: 'center', fontWeight: 600, fontSize: '16px'}}>LIBRARY AND DOCUMENTATION OFFICE</Text>
                </View>
                <Image src={"oic-logo.png"} style={styles.logo}/>
            </View>

            <Text style={{paddingTop: 22, textAlign: 'center', fontWeight: 'semibold', fontSize: 11, textDecoration: 'underline'}}>Booking Form: Distance Learning Theatre (DLT) at the IUT Library</Text>
            
            <View style={{border: '1px solid black', marginRight: 20, fontSize: 10, marginTop: 16, padding: 4}}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', gap: 24}}>
                    <View style={{flex: 'auto'}}>
                        <Text>Name: </Text>
                        <View style={{...styles.line, marginLeft: 30}}></View>
                    </View>
                    <View style={{minWidth: 100}}>
                        <Text>Date: </Text>
                        <View style={{...styles.line, marginLeft: 25}}></View>
                    </View>
                </View>

                <View style={{justifyContent: 'space-between', flexDirection: 'row', gap: 16}}>
                    <View style={{flex: 'auto'}}>
                        <Text>Designation: </Text>
                        <View style={{...styles.line, marginLeft: 58}} />
                    </View>
                    <View style={{minWidth: 320}}>
                        <Text>Faculty/Department/Office/Centre/Institute: </Text>
                        <View style={{...styles.line, marginLeft: 212}}></View>
                    </View>
                </View>
                
                <View style={{justifyContent: 'space-between', flexDirection: 'row', gap: 16}}>
                    <View style={{flex: 'auto'}}>
                        <Text>Mobile no: </Text>
                        <View style={{...styles.line, marginLeft: 52}} />
                    </View>
                    <View style={{minWidth: 320}}>
                        <Text>Email: </Text>
                        <View style={{...styles.line, marginLeft: 30}}></View>
                    </View>
                </View>

                <Text style={{paddingTop: 12}}>Purpose of Booking (Official Meeting Purpose Only):</Text>
                <View style={{flex: 'auto'}}>
                    <Text>Details: </Text>
                    <View style={{...styles.line, marginLeft: 40}} />
                    <View style={{...styles.line, paddingTop: 8}} />
                </View>
                
                <View>
                    <Text>Days of Booking (During working days and Office Time): </Text>
                    <View style={{...styles.line, marginLeft: 266, maxWidth: 50}}></View>
                </View>

                <View style={{flexDirection: 'row',}}>
                    <View>
                        <Text>Time: </Text>
                        <View style={{...styles.line, marginLeft: 30, minWidth: 50}}></View>
                    </View>
                    <View>
                        <Text>to</Text>
                        <View style={{...styles.line, marginLeft: 10, minWidth: 50}}></View>
                    </View>
                    <Text> (am/pm), Tentative Duration of the Event:</Text>
                    <View style={{...styles.line, minWidth: 55}}></View>
                </View>
            </View>
        </Page>
      </Document>
    </>
  )
}
