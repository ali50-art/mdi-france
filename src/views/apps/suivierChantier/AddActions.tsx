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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {store.data.type === 'indestry' ? (
            <PDFFile2 data={store.data} data2={data2} />
          ) : (
            <PDFFile data={store.data} data2={data} />
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
