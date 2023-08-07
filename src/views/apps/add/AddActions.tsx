import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { deleteData, getStoreData, Stores } from '../../../lib/db'

import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFFile from '../../../utils/generatePdf'
import PDFFile2 from '../../../utils/generatePdf2'
import CardContent from '@mui/material/CardContent'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { addPdf } from '../../../store/apps/pdf'
import { AppDispatch } from 'src/store'

const AddActions = ({ count, handleSetCount, handleActiStepTOfirstStep }: any) => {
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

    setPdefType(type)
  }
  const dispatch = useDispatch<AppDispatch>()
  const handleSendPdf = async () => {
    const type = localStorage.getItem('pdfType')
    if (type == 'residentiel') {
      const res = await getStoreData(Stores.PdfData)
      const res2: any = await getStoreData(Stores.PdfInfo)
      const newArr: any = []
      for (let i = 0; i < res.length; i++) {
        const el: any = res[i]
        const newObj: any = {
          firstPdf: i === 0 ? true : false,
          type: 'residentiel',
          clientName: res2[0]?.username || '',
          clientAdress: res2[0]?.address || '',
          clientVille: res2[0]?.ville || '',
          clientCodePostal: res2[0]?.codePostal || '',
          travauxAdress: res2[0]?.adressTravaux || '',
          travauxVille: res2[0]?.villeTravaux || '',
          travauxCodePostal: res2[0]?.codePostalTravaux || '',
          place: el.local || '',
          filterType: el.type || '',
          model: el.red || '',
          mass: el.mass || '',
          nbRep: el.rep || '',
          dn: el.dn || '',
          nature: el.nature || ''
        }
        newArr.push(newObj)
      }
      await dispatch(addPdf(newArr))
      const promises2 = res.map(async (el: any) => {
        return await deleteData(Stores.PdfData, el.id)
      })

      await Promise.all(promises2)
      handleSetCount()
      toast.success('pdf envoyez avec success')
      await deleteData(Stores.PdfInfo, res2[0].id)
      localStorage.removeItem('pdfInfoId')
      handleActiStepTOfirstStep()
    } else {
      const res = await getStoreData(Stores.PdfData2)
      const res2: any = await getStoreData(Stores.PdfInfo)
      const newArr: any = []
      for (let i = 0; i < res.length; i++) {
        const el: any = res[i]
        const newObj: any = {
          type: 'indestry',
          clientName: res2[0]?.username || '',
          clientAdress: res2[0]?.address || '',
          clientVille: res2[0]?.ville || '',
          clientCodePostal: res2[0]?.codePostal || '',
          travauxAdress: res2[0]?.adressTravaux || '',
          travauxVille: res2[0]?.villeTravaux || '',
          travauxCodePostal: res2[0]?.codePostalTravaux || '',
          place: el.local || '',
          filterType: el.type || '',
          model: el.red || '',
          mass: undefined,
          dn: undefined,
          nbRep: el.rep || '',
          nature: el.nature || ''
        }
        newArr.push(newObj)
      }
      await dispatch(addPdf(newArr))
      const promises2 = res.map(async (el: any) => {
        return await deleteData(Stores.PdfData2, el.id)
      })
      await Promise.all(promises2)
      handleSetCount()
      toast.success('pdf envoyez avec success')
      localStorage.removeItem('pdfInfoId')
      handleActiStepTOfirstStep()
    }
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
            <Button
              fullWidth
              variant='contained'
              sx={{ mb: 2, '& svg': { mr: 2 } }}
              disabled={!online}
              onClick={handleSendPdf}
            >
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
