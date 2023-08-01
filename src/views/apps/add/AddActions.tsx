import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFFile from '../../../utils/generatePdf'
import PDFFile2 from '../../../utils/generatePdf2'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const AddActions = ({ count }: any) => {
  const [online, setIsOnline] = useState(navigator.onLine)
  const [pdfType, setPdefType] = useState('indestry')
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

  const handleSetPdfType = () => {
    const type: any = localStorage.getItem('pdfType')
    console.log('type : ', type)

    setPdefType(type)
  }

  useEffect(() => {
    function handleOnlineStatusChange() {
      setIsOnline(navigator.onLine)
    }
    handleSetPdfType()
    window.addEventListener('online', handleOnlineStatusChange)
    window.addEventListener('offline', handleOnlineStatusChange)

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange)
      window.removeEventListener('offline', handleOnlineStatusChange)
    }
  }, [, navigator.onLine, count, pdfType])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button fullWidth variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }} disabled={!online}>
              <Icon fontSize='1.125rem' icon='tabler:send' />
              Envoez PDF
            </Button>

            {count >= 0 &&
              (pdfType === 'indestry' ? (
                <PDFDownloadLink document={<PDFFile2 count={count} />} fileName={formateDate()}>
                  {({ loading }) =>
                    loading ? (
                      <Button fullWidth variant='tonal' color='secondary'>
                        loading ...
                      </Button>
                    ) : (
                      <Button fullWidth variant='tonal' color='secondary'>
                        Télecharger
                      </Button>
                    )
                  }
                </PDFDownloadLink>
              ) : (
                <PDFDownloadLink document={<PDFFile count={count} />} fileName={formateDate()}>
                  {({ loading }) =>
                    loading ? (
                      <Button fullWidth variant='tonal' color='secondary'>
                        loading ...
                      </Button>
                    ) : (
                      <Button fullWidth variant='tonal' color='secondary'>
                        Télecharger
                      </Button>
                    )
                  }
                </PDFDownloadLink>
              ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AddActions
