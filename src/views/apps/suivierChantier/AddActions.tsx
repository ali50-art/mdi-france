// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFFile from '../../../utils/generatePdfBackend'
import PDFFile2 from '../../../utils/generatePdfBackend2'
import { RootState } from 'src/store'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { Icon } from '@iconify/react'

// ** Icon Imports

const AddActions = () => {
  const formateDate = () => {
    // Format options for the date in French
    const newData = new Date()
    const options: any = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }

    // Format the date using Intl.DateTimeFormat with the French locale
    return new Intl.DateTimeFormat('fr-FR', options).format(newData)
  }
  const store: any = useSelector((state: RootState) => state.suiviChantierPdf)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {store.data.type === 'indestry' ? (
            <PDFDownloadLink document={<PDFFile2 data={store} />} fileName={formateDate()}>
              {({ loading }) =>
                loading ? (
                  <Button fullWidth variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }}>
                    loading ...
                  </Button>
                ) : (
                  <Button fullWidth variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }}>
                    Télecharger
                  </Button>
                )
              }
            </PDFDownloadLink>
          ) : (
            <PDFDownloadLink document={<PDFFile data={store} />} fileName={formateDate()}>
              {({ loading }) =>
                loading ? (
                  <Button fullWidth variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }}>
                    loading ...
                  </Button>
                ) : (
                  <Button fullWidth variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }}>
                    Télecharger
                  </Button>
                )
              }
            </PDFDownloadLink>
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
