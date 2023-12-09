// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import PDFFile from '../../../utils/generatePdfBackend'

import PDFFile2 from '../../../utils/generatePdfBackend2'
import { RootState } from 'src/store'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

// ** Icon Imports

const AddActions = () => {
  const store: any = useSelector((state: RootState) => state.suiviChantierPdf)
  const [data, setData] = useState<any>([])
  const [data2, setData2] = useState<any>([])
  const handleSetData = () => {
    const dataFiltered: any = []
    store?.data?.pdefDetails?.forEach((element: any) => {
      const newData = []
      newData.push(element.place)
      newData.push(element.filterType)
      newData.push(element.model)
      newData.push(element.mass)
      newData.push(element.nbRep)
      newData.push(element.dn)
      newData.push(element.nature)
      dataFiltered.push(newData)
    })
    setData(dataFiltered)
  }
  const handleSetData2 = () => {
    const dataFiltered: any = []
    store?.data?.pdefDetails?.forEach((element: any) => {
      const newData = []
      newData.push(element.place)
      newData.push(element.filterType)
      newData.push(element.model)
      newData.push(element.nbRep)
      newData.push(element.nature)
      dataFiltered.push(newData)
    })
    setData2(dataFiltered)
  }

  useEffect(() => {
    handleSetData()
    handleSetData2()
  }, [store.data])
  const handleDownloadXl = (d: any) => {
    const xldata: any = []
    if (d.type == 'indestrie') {
      d.pdefDetails.forEach((element: any) => {
        xldata.push({
          "Zon d'implantation": element.place,
          'Type de point singulier': element.filterType,
          'Réference metelas': element.model,
          'N° repérage': element.nbRep,
          Fluide: element.nature
        })
      })
    } else {
      d.pdefDetails.forEach((element: any) => {
        xldata.push({
          "Zon d'implantation": element.place,
          'Type de point singulier': element.filterType,
          'Réference metelas': element.model,
          'N° repérage': element.nbRep,
          dn: element.dn,
          'Nature du fluide caloporteur': element.nature
        })
      })
    }

    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(xldata)
    XLSX.utils.book_append_sheet(wb, ws, 'mdiExcel')
    XLSX.writeFile(wb, `${d.clientName}.xlsx`)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {store.data.type === 'indestrie' ? (
            <PDFFile2 data={store.data} data2={data2} />
          ) : (
            <PDFFile data={store.data} data2={data} />
          )}
          {store.data.type === 'indestrie' ? (
            <Button
              style={{ marginBottom: '0.5rem' }}
              fullWidth
              variant='contained'
              onClick={() => handleDownloadXl(store?.data)}
              sx={{ '& svg': { mr: 2 }, marginRight: '1.5rem' }}
            >
              Télécharger Excel
            </Button>
          ) : (
            <Button
              fullWidth
              style={{ marginBottom: '0.5rem' }}
              variant='contained'
              onClick={() => handleDownloadXl(store?.data)}
              sx={{ '& svg': { mr: 2 }, marginRight: '1.5rem' }}
            >
              Télécharger Excel
            </Button>
          )}
          <Link href='/suivi-chantier'>
            <Button fullWidth variant='outlined' sx={{ '& svg': { mr: 2 }, marginRight: '1.5rem' }}>
              <Icon fontSize='1.125rem' icon='tabler:arrow-big-left-lines-filled' />
              Retourner
            </Button>
          </Link>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AddActions
