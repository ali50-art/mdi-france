import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { deleteData, getStoreData, Stores } from '../../../lib/db'

import PDFFile from '../../../utils/generatePdf'
import PDFFile2 from '../../../utils/generatePdf2'
import CardContent from '@mui/material/CardContent'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { addPdf } from '../../../store/apps/pdf'
import { AppDispatch } from 'src/store'

const AddActions = ({ count, handleSetCount, handleActiStepTOfirstStep }: any) => {
  const auth = useAuth()
  const [online, setIsOnline] = useState(navigator.onLine)
  const [pdfType, setPdefType] = useState('indestry')
  const [data, setData] = useState<any>([])
  const [data2, setData2] = useState<any>([])
  const [res, setRes] = useState<any>([])
  const [data3, setData3] = useState<any>([])
  const [data4, setData4] = useState<any>([])

  const handleSetPdfType = () => {
    const type: any = localStorage.getItem('pdfType')
    setPdefType(type)
  }
  const handleFetchDataPadf1 = async () => {
    const res: any = await getStoreData(Stores.PdfData)
    setRes([...res])
    const newData: any = []
    res.forEach((element: any) => {
      const newArrayData: any = []
      newArrayData.push(element.local)
      newArrayData.push(element.type)
      newArrayData.push(element.red)
      newArrayData.push(element.mass)
      newArrayData.push(element.rep)
      newArrayData.push(element.dn)
      newArrayData.push(element.nature)
      newData.push(newArrayData)
    })
    setData(newData)
    const res2: any = await getStoreData(Stores.PdfInfo)
    setData2([...res2])
  }
  const handleFetchDataPadf2 = async () => {
    const res: any = await getStoreData(Stores.PdfData2)

    const newData: any = []
    res.forEach((element: any) => {
      const newArrayData: any = []
      newArrayData.push(element.local)
      newArrayData.push(element.type)
      newArrayData.push(element.red)
      newArrayData.push(element.nature)
      newArrayData.push(element.rep)

      newData.push(newArrayData)
    })
    setData3(newData)
    const res2: any = await getStoreData(Stores.PdfInfo)
    setData4([...res2])
  }

  // const handleFetchDataPadf2 = async () => {
  //   const res: any = await getStoreData(Stores.PdfData2)
  //   const res2 = await getStoreData(Stores.PdfInfo)

  //   return [res, res2]
  // }
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
          firstPdf: i === 0 ? true : false,
          type: 'indestrie',
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
          nature: el.nature || '',
          nbRep: el.rep || ''
        }
        newArr.push(newObj)
      }

      await dispatch(addPdf(newArr))
      const promises2 = res.map(async (el: any) => {
        return await deleteData(Stores.PdfData2, el.id)
      })
      await Promise.all(promises2)
      handleSetCount()
      toast.success('pdf envoyé avec succée')
      localStorage.removeItem('pdfInfoId')
      handleActiStepTOfirstStep()
      auth.getProfile()
    }
  }

  useEffect(() => {
    function handleOnlineStatusChange() {
      setIsOnline(navigator.onLine)
    }
    handleFetchDataPadf1()
    handleFetchDataPadf2()
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
              Envoyer votre PDF
            </Button>

            {count >= 0 &&
              (pdfType === 'indestry' ? (
                <PDFFile2 data={data3} data2={data4} />
              ) : (
                <>
                  <PDFFile data={data} data2={data2} res={res} />
                </>
              ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AddActions
