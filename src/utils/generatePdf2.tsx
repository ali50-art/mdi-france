import { Page, Text, Image, Document, StyleSheet, View } from '@react-pdf/renderer'
import { initDB, getStoreData, Stores } from '../lib/db'
import { Font } from '@react-pdf/renderer'
import { toast } from 'react-hot-toast'
import MyCustomFont from '../fonts/Anton-Regular.ttf'
import { useEffect, useState } from 'react'

Font.register({
  family: 'AntonFamily',
  src: MyCustomFont
})

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'AntonFamily'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'AntonFamily'
  },
  image: {
    width: '40%',
    position: 'absolute',
    marginTop: '150px',
    top: '100%',
    left: '50%',
    transform: 'translate(-120%, -50%)'
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'AntonFamily'
  },
  firstTitle: {
    marginTop: '230px',
    fontSize: '12',
    marginBottom: '10px',
    color: '#000',
    textDecoration: 'underline'
  },
  fontSize: {
    fontSize: '10px',
    color: '#000',
    marginBottom: '4px'
  },
  boldStyle: {
    width: '160px',
    marginLeft: '250px'
  },
  boldStyle2: {
    marginLeft: '70px'
  },
  boldStyle3: {
    marginLeft: '60px'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'AntonFamily'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 5
  },
  label: {
    fontSize: 10
  },
  table: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'center',
    height: 30,
    textAlign: 'center',
    fontSize: 12
  },
  columnHeader: {
    width: '14.28%', // 100% divided by 7 columns
    borderRightWidth: 1,
    borderRightColor: '#000'
  },
  headerContainer: {
    flexDirection: 'row'
  },
  headerText: {
    width: '50%' // 100% divided by 2 columns
  },
  bodyRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    height: 30,
    textAlign: 'center',
    fontSize: 12
  }
})
const Table = () => (
  <View>
    {/* First header */}
    <View style={[styles.table, styles.headerContainer]}>
      <View style={[styles.columnHeader, styles.headerText]}>
        <Text></Text>
      </View>
      <View style={[styles.columnHeader, styles.headerText]}>
        <Text>Matelas isolants : </Text>
      </View>
      {/* Seven columns in the second header */}
    </View>

    {/* Example row in the body */}
    <View style={styles.bodyRow}>
      <View style={[styles.columnHeader, styles.headerText]}>
        <Text>Zone d'implantation</Text>
      </View>
      <View style={[styles.columnHeader, styles.headerText]}>
        <Text>Types de point singulier</Text>
      </View>
      {/* Seven cells in the second row */}
      <View style={[styles.columnHeader, styles.headerText]}>
        <Text>Référence mateles</Text>
      </View>

      <View style={[styles.columnHeader, styles.headerText]}>
        <Text>N° De repérage</Text>
      </View>

      <View style={[styles.columnHeader, styles.headerText]}>
        <Text>Fluid</Text>
      </View>
    </View>
  </View>
)

const PDFFile = ({ count }: any) => {
  const [data, setData] = useState<any>([])
  const [data2, setData2] = useState<any>([])
  const handleInitDB = async () => {
    await initDB()
  }
  const handleFetchData = async () => {
    try {
      const res = await getStoreData(Stores.PdfData2)
      const res2 = await getStoreData(Stores.PdfInfo)
      setData([...res])
      setData2(res2)
    } catch (err) {
      toast.error('opps !')
    }
  }
  const Pages = [
    {
      page: (
        <Page>
          <View
            style={{
              textAlign: 'center'
            }}
            fixed
          >
            <View
              style={{
                textAlign: 'center',
                position: 'relative'
              }}
              fixed
            >
              <Image src='/images/apple-touch-icon.png' style={styles.image} />
            </View>

            <View>
              <Text style={styles.firstTitle}>ETAT RECAPITULATIF INDUSTERIS</Text>
              <Text style={{ textAlign: 'center', marginBottom: '4px' }}>
                <Text style={styles.fontSize}>je sousigné</Text>
              </Text>
              <Text style={styles.fontSize}>MD INDUSTRIE</Text>
              <Text style={styles.fontSize}>23 Avenue Fréres Montgolfier</Text>
              <Text style={styles.fontSize}>69680 CHASSIEU </Text>
            </View>
            <View style={{ marginTop: '16px' }}>
              <Text style={styles.fontSize}>
                Attest sur l'honneur avoir mis en oeuvre les travaux d'isolation de points singuliers
              </Text>
              <Text style={{ textAlign: 'center', marginBottom: '4px' }}>
                <Text style={styles.fontSize}>au bénefice de : </Text>
              </Text>

              <Text style={[styles.fontSize, { marginTop: '20px' }]}>{data2[0]?.username}</Text>
              <Text style={{ textAlign: 'center', marginBottom: '4px' }}>
                <Text style={styles.fontSize}>{data2[0]?.address} </Text>
              </Text>
              <Text style={styles.fontSize}>{data2[0]?.codePostal + ' ' + data2[0]?.ville}</Text>
            </View>
            <View style={{ marginTop: '16px', marginBottom: '16px' }}>
              <Text style={styles.boldStyle2}>
                <Text>
                  <Text style={{ fontSize: 12 }}>Marque : </Text>{' '}
                  <Text style={{ fontSize: '11' }}>MDI TECHNOLOGIE</Text>
                </Text>
              </Text>
              <Text style={styles.boldStyle3}>
                <Text>
                  <Text style={{ fontSize: 12 }}>Résistance thermique</Text>{' '}
                  <Text style={{ fontSize: '11' }}>
                    {' '}
                    : 1,5 m².K/w sur un réseau d'au chaude et retour de condensats a température moyenne de 70°c
                  </Text>
                </Text>
              </Text>
              <View style={styles.boldStyle3}>
                <Text style={{ fontSize: '11', marginLeft: '130px' }}>
                  {' '}
                  : 1,2 m².K/w sur un réseau vapeur a tempurature moyenne de 110°c
                </Text>
              </View>
              <View style={styles.boldStyle3}>
                <Text style={{ fontSize: '11', marginLeft: '130px' }}>
                  {' '}
                  : 1,2 m².K/w sur un réseau fluide organique a tempurature moyenne de 120°c
                </Text>
              </View>

              <Text style={styles.boldStyle2}>
                <Text>
                  <Text style={{ fontSize: 12 }}>Isolant et référance</Text>{' '}
                  <Text style={{ fontSize: '11' }}> : Laine de verre ISOVER TECH ROLL 3.0- classé au feu A1</Text>
                </Text>
              </Text>
              <Text style={styles.boldStyle2}>
                <Text>
                  <Text style={{ fontSize: 12 }}>Température maximale : </Text>{' '}
                  <Text style={{ fontSize: '11' }}>300°C</Text>
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              textAlign: 'center'
            }}
            fixed
          >
            <Text style={{ marginTop: '50px' }}></Text>
            <Text style={styles.boldStyle2}>
              <Text>
                <Text style={{ fontSize: 12 }}>Référance : </Text> <Text style={{ fontSize: '11' }}>ISOVAN</Text>
              </Text>
            </Text>

            <Text style={{ marginTop: '10px' }}>
              <Text>
                <Text style={{ fontSize: 12 }}>Total de fuilde organique {data.length} </Text>{' '}
              </Text>
            </Text>
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </Page>
      )
    },
    {
      page: (
        <Page size='A4'>
          <View>
            {/* Render the table */}
            <Table />
            {data?.map((el: any, i: number) => {
              return (
                <View style={styles.bodyRow} key={i}>
                  <View style={[styles.columnHeader, styles.headerText]}>
                    <Text>{el.local}</Text>
                  </View>
                  <View style={[styles.columnHeader, styles.headerText]}>
                    <Text>{el.type}</Text>
                  </View>
                  {/* Seven cells in the second row */}
                  <View style={[styles.columnHeader, styles.headerText]}>
                    <Text>{el.red}</Text>
                  </View>
                  <View style={[styles.columnHeader, styles.headerText]}>
                    <Text>{el.rep}</Text>
                  </View>
                  <View style={[styles.columnHeader, styles.headerText]}>
                    <Text>{el.nature}</Text>
                  </View>
                </View>
              )
            })}
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </Page>
      )
    }
  ]
  useEffect(() => {
    console.log()

    handleInitDB()
    handleFetchData()
  }, [count])

  return (
    <Document>
      {Pages?.map((el: any) => {
        return el.page
      })}
    </Document>
  )
}

export default PDFFile
