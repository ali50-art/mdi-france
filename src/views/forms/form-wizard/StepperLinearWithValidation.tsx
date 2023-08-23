// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'

import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import AddNewCustomers from 'src/views/apps/add/AddNewCustomer'
import { initDB, addData, getStoreData, deleteData, Stores } from '../../../lib/db'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import AddActions from 'src/views/apps/add/AddActions'
import AddCard from 'src/views/apps/add/AddCard'
import AddCard2 from 'src/views/apps/add/AddCard2'

const steps = [
  {
    title: 'Type de chantier',
    subtitle: 'Choisir votre type de chantier'
  },
  {
    title: "Information d'Installation",
    subtitle: "Enter les informations de l'installation"
  },

  {
    title: "Début de l'installation",
    subtitle: 'consterouir voter pdf'
  }
]

const defaultAccountValues = {
  address: '',
  ville: '',
  codePostal: '',
  username: '',
  adressTravaux: '',
  villeTravaux: '',
  codePostalTravaux: ''
}

const defaultSocialValues = {
  google: '',
  twitter: '',
  facebook: '',
  linkedIn: ''
}

const accountSchema = yup.object().shape({
  username: yup.string().required(),
  address: yup.string().required(),
  ville: yup.string().required(),
  codePostal: yup
    .string()
    .matches(/^\d{2}$/, 'ce champ doit inclure deux chiffres')
    .required('ce champ est obligatoire!')
})

const socialSchema = yup.object().shape({
  google: yup.string().required(),
  twitter: yup.string().required(),
  facebook: yup.string().required(),
  linkedIn: yup.string().required()
})

const StepperLinearWithValidation = () => {
  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)
  const handleFirstType = () => {
    const type = localStorage.getItem('pdfType')
    if (type) {
      return type
    } else {
      return 'indestry'
    }
  }
  const handleActiStepTOfirstStep = () => {
    setActiveStep(0)
  }
  const [authType, setAuthType] = useState<any>(() => handleFirstType())
  const [addCustomerOpen, setAddCustomerOpen] = useState<boolean>(false)
  const [selectedClient, setSelectedClient] = useState<any | null>(null)
  const [count, setCount2] = useState(0)
  const [isDBReady, setIsDBReady] = useState<boolean>(false)

  const handleInitDB = async () => {
    const status = await initDB()
    setIsDBReady(status)
    if (status) {
      handleGetInfoFromDb()
    }
  }
  const [clients, setClients] = useState<object[] | undefined>([
    {
      invoice: '124',
      paymentDetails: {
        totalDue: '$12,110.55',
        bankName: 'American Bank',
        country: 'United States',
        iban: 'ETD95476213874685',
        swiftCode: 'BR91905'
      }
    }
  ])
  const toggleAddCustomerDrawer = () => setAddCustomerOpen(!addCustomerOpen)

  // ** Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  })

  const {
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleAddInfoToDb = async (data: any) => {
    if (localStorage.getItem('pdfInfoId')) {
      const id: any = localStorage.getItem('pdfInfoId')

      await deleteData(Stores.PdfInfo, id)
    }
    let id = 1
    if (localStorage.getItem('pdfInfoId') !== null) {
      const x: any = localStorage.getItem('pdfInfoId')
      id = Number(x) + 1
    }
    localStorage.setItem('pdfInfoId', JSON.stringify(id))
    try {
      await addData(Stores.PdfInfo, { ...data, id })
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }
  const handleGetInfoFromDb = async () => {
    const res = await getStoreData(Stores.PdfInfo)
    if (res.length > 0) {
      const data: any = res[0]
      accountReset({
        address: data.address,
        username: data.username,
        adressTravaux: data.adressTravaux,
        codePostal: data.codePostal,
        ville: data.ville,
        villeTravaux: data.villeTravaux,
        codePostalTravaux: data.codePostalTravaux
      })

      setActiveStep(1)
    } else {
      setActiveStep(0)

      return
    }
    const type = localStorage.getItem('pdfType')
    if (type) {
      setActiveStep(activeStep + 2)
    }
  }

  const onSubmit = (data: any) => {
    handleAddInfoToDb(data)
    toast.success('informtion de client & travaux Ajouter avec succée')
    setActiveStep(activeStep + 1)
  }

  const handleSetType = (authType: string) => {
    localStorage.setItem('pdfType', authType)
    setAuthType(authType)
  }

  const handleSetCount = () => {
    setCount2(count + 1)
  }
  useEffect(() => {
    handleInitDB()
  }, [, isDBReady])

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={5} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12}>
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant='h3' sx={{ mb: 3 }}>
                  Sélectionnez le type de chantier
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Pour passé a la case suivante veuillez choisir le type de chantier
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box
                onClick={() => handleSetType('residentiel')}
                sx={{
                  py: 4.75,
                  px: 7.2,
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: theme =>
                    `1px solid ${authType === 'residentiel' ? theme.palette.primary.main : theme.palette.divider}`
                }}
              >
                <Box
                  sx={{
                    rowGap: 2,
                    columnGap: 3,
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: ['center', 'start'],
                    flexDirection: ['column', 'row']
                  }}
                >
                  <Box sx={{ display: 'flex', ...(authType === 'residentiel' ? { color: 'primary.main' } : {}) }}></Box>
                  <div>
                    <Typography
                      variant='h4'
                      sx={{ mb: 2, ...(authType === 'residentiel' ? { color: 'primary.main' } : {}) }}
                    >
                      Résidentiel/Tertiaire
                    </Typography>
                    <Typography sx={{ ...(authType === 'residentiel' ? { color: 'primary.main' } : {}) }}></Typography>
                  </div>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                onClick={() => handleSetType('indestry')}
                sx={{
                  py: 4.75,
                  px: 7.2,
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: theme =>
                    `1px solid ${authType === 'indestry' ? theme.palette.primary.main : theme.palette.divider}`
                }}
              >
                <Box
                  sx={{
                    rowGap: 2,
                    columnGap: 3,
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: ['center', 'start'],
                    flexDirection: ['column', 'row']
                  }}
                >
                  <Box sx={{ display: 'flex', ...(authType === 'indestry' ? { color: 'primary.main' } : {}) }}></Box>
                  <div>
                    <Typography
                      variant='h4'
                      sx={{ mb: 2, ...(authType === 'indestry' ? { color: 'primary.main' } : {}) }}
                    >
                      Indestrie
                    </Typography>
                    <Typography sx={{ ...(authType === 'indestry' ? { color: 'primary.main' } : {}) }}></Typography>
                  </div>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type='submit' variant='contained' onClick={() => setActiveStep(activeStep + 1)}>
                Suivant
              </Button>
            </Grid>
          </Grid>
        )
      case 1:
        return (
          <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Information d'instalation
                </Typography>
                <Typography variant='caption' component='p'>
                  entez les informations d'instalation
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='username'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Nom de site'
                      onChange={onChange}
                      placeholder='Nom de client'
                      error={Boolean(accountErrors.username)}
                      aria-describedby='stepper-linear-account-username'
                      {...(accountErrors.username && { helperText: 'Nom de client est obligatoir' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='address'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Addresse'
                      onChange={onChange}
                      error={Boolean(accountErrors.address)}
                      placeholder='Address'
                      aria-describedby='stepper-linear-account-email'
                      {...(accountErrors.address && { helperText: accountErrors.address.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='ville'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Ville'
                      placeholder='Ville'
                      onChange={onChange}
                      id='stepper-linear-account-password'
                      error={Boolean(accountErrors.ville)}
                      {...(accountErrors.ville && { helperText: accountErrors.ville.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='codePostal'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      placeholder='Code Postal'
                      label='Code Postal'
                      onChange={onChange}
                      id='stepper-linear-account-password'
                      error={Boolean(accountErrors.codePostal)}
                      {...(accountErrors.codePostal && { helperText: accountErrors.codePostal.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}></Grid>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='tonal' color='secondary' onClick={() => setActiveStep(activeStep - 1)}>
                  Retour
                </Button>
                <Button type='submit' variant='contained'>
                  Suivant
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 2:
        return (
          <>
            <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
              <Grid container spacing={6}>
                <Grid item xl={9} md={12} xs={12}>
                  {authType === 'residentiel' ? (
                    <AddCard
                      clients={clients}
                      invoiceNumber={500}
                      selectedClient={selectedClient}
                      setSelectedClient={setSelectedClient}
                      toggleAddCustomerDrawer={toggleAddCustomerDrawer}
                      handleSetCount={handleSetCount}
                      count2={count}
                    />
                  ) : (
                    <AddCard2
                      clients={clients}
                      invoiceNumber={500}
                      selectedClient={selectedClient}
                      setSelectedClient={setSelectedClient}
                      toggleAddCustomerDrawer={toggleAddCustomerDrawer}
                      handleSetCount={handleSetCount}
                      count2={count}
                    />
                  )}
                </Grid>
                <Grid item xl={3} md={12} xs={12}>
                  <AddActions
                    count={count}
                    handleSetCount={handleSetCount}
                    handleActiStepTOfirstStep={handleActiStepTOfirstStep}
                  />
                </Grid>
              </Grid>
              <AddNewCustomers
                clients={clients}
                open={addCustomerOpen}
                setClients={setClients}
                toggle={toggleAddCustomerDrawer}
                setSelectedClient={setSelectedClient}
              />
            </DatePickerWrapper>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <Button variant='tonal' color='secondary' onClick={handleBack}>
                Retour
              </Button>
            </Grid>
          </>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps: {
                error?: boolean
              } = {}
              if (index === activeStep) {
                labelProps.error = false
                if (
                  (accountErrors.ville ||
                    accountErrors.codePostal ||
                    accountErrors.address ||
                    accountErrors.username) &&
                  activeStep === 1
                ) {
                  labelProps.error = true
                } else if (authType == null) {
                  labelProps.error = true
                } else if (
                  (socialErrors.google || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                  activeStep === 2
                ) {
                  labelProps.error = true
                } else {
                  labelProps.error = false
                }
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

export default StepperLinearWithValidation
