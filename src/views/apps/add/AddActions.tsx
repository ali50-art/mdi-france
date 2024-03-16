import { useState, useEffect, ReactElement, Ref, forwardRef } from 'react'

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
import Chip from '@mui/material/Chip'
import Fade, { FadeProps } from '@mui/material/Fade'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { addPdf } from '../../../store/apps/pdf'
import { AppDispatch } from 'src/store'
import { Dialog, DialogContent, IconButton, IconButtonProps, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

const AddActions = ({ count, handleSetCount, handleActiStepTOfirstStep, setActiveStep }: any) => {
  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const { direction } = settings
  const arrowIcon = direction === 'ltr' ? 'tabler:chevron-right' : 'tabler:chevron-left'
  const [show, setShow] = useState<boolean>(false)
  const auth = useAuth()
  const [online, setIsOnline] = useState(navigator.onLine)
  const [pdfType, setPdefType] = useState('indestry')
  const [data, setData] = useState<any>([])
  const [data2, setData2] = useState<any>([])
  const [res2, setRes] = useState<any>([])
  const [data3, setData3] = useState<any>([])
  const [data4, setData4] = useState<any>([])
  const [loading, setLoading] = useState<any>(false)
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
    setLoading(true)
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

      const promises2 = res.map(async (el: any) => {
        const res = await deleteData(Stores.PdfData, el.id)

        return res
      })

      await Promise.all(promises2)

      handleSetCount()
      toast.success('pdf envoyez avec success')
      await deleteData(Stores.PdfInfo, res2[0].id)
      handleActiStepTOfirstStep()
      setLoading(false)
      await dispatch(addPdf(newArr))
      auth.getProfile()
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
      const promises2 = res.map(async (el: any) => {
        return await deleteData(Stores.PdfData2, el.id)
      })
      await Promise.all(promises2)
      handleSetCount()
      toast.success('pdf envoyé avec succée')
      localStorage.removeItem('pdfInfoId')
      handleActiStepTOfirstStep()
      setLoading(false)
      await dispatch(addPdf(newArr))
      auth.getProfile()
    }
  }
  const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
  ) {
    return <Fade ref={ref} {...props} />
  })
  const handleClose = () => {
    setShow(false)
  }
  const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    top: 0,
    right: 0,
    color: 'grey.500',
    position: 'absolute',
    transform: 'translate(10px, -10px)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `${theme.palette.background.paper} !important`,
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    '&:hover': {
      transform: 'translate(7px, -5px)'
    }
  }))
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
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {loading ? (
                <Button fullWidth variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }} disabled={true}>
                  <Icon fontSize='1.125rem' icon='tabler:send' />
                  Loading...
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant='contained'
                  sx={{ mb: 2, '& svg': { mr: 2 } }}
                  disabled={!online}
                  onClick={() => setShow(true)}
                >
                  <Icon fontSize='1.125rem' icon='tabler:send' />
                  Envoyer votre PDF
                </Button>
              )}

              {count >= 0 &&
                (pdfType === 'indestry' ? (
                  <PDFFile2 data={data3} data2={data4} />
                ) : (
                  <>
                    <PDFFile data={data} data2={data2} res2={res2} />
                  </>
                ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={handleClose}
        onBackdropClick={handleClose}
        TransitionComponent={Transition}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={handleClose}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant='h3' sx={{ mb: 3 }}>
                  Verification de l'Adresse du Chantier
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Cette méthode est importante pour vérifier l'adresse afin d'éviter les conflits d'adresse !
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <div className='demo-space-x'>
                <Chip label={`Nome de site : ${data2[0]?.username}`} color='primary' />
                <Chip label={`Addresse : ${data2[0]?.address}`} color='primary' />
                <Chip label={`Ville : ${data2[0]?.ville}`} color='primary' />
                <Chip label={`Code postal : ${data2[0]?.codePostal}`} color='primary' />
              </div>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant='contained'
                startIcon={<Icon icon={'tabler:chevron-left'} />}
                disabled={loading ? true : false}
                onClick={() => {
                  setShow(false)
                  setActiveStep(1)
                }}
              >
                Retour
              </Button>
              <Button
                variant='contained'
                endIcon={<Icon icon={arrowIcon} />}
                disabled={loading ? true : false}
                onClick={() => {
                  handleSendPdf()
                  setShow(false)
                }}
              >
                Continuer
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddActions
