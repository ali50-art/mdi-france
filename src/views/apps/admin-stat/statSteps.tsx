// ** React Imports
import { ChangeEvent, Fragment, forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

// ** MUI Import
import Checkbox from '@mui/material/Checkbox'

// ** Custom Component Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

// ** Demo Components Imports
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'

import { fetchData } from 'src/store/apps/material'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// import toast from 'react-hot-toast'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import { getSepcifiqueStat } from 'src/store/apps/pdf'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { fr } from 'date-fns/locale'

const steps = [
  {
    title: 'Nature de la recherche',
    subtitle: 'Choisissez votre type de recherche.'
  },
  {
    title: 'Informations nécessaires',
    subtitle: 'Informations pour le recherche'
  },
  {
    title: 'Affichage de vos statistiques',
    subtitle: 'Voici vos statistiques de votre recherche'
  }
]

const StepperLinearWithValidation = ({ id }: any) => {
  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)

  // ** Hooks

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (type == '') {
      return
    }
    if (selected == 'select') {
      const data = {
        start: values.startDate,
        end: values.endDate,
        type: type,
        material: selectedData,
        instalteurId: id
      }
      dispatch(getSepcifiqueStat(data))
    } else {
      const matrailArray = store.data.map((el: any) => el.model)
      const data = {
        start: values.startDate,
        end: values.endDate,
        type: type,
        material: matrailArray,
        instalteurId: id
      }
      dispatch(getSepcifiqueStat(data))
    }
    setActiveStep(activeStep + 1)
  }

  const data: any[] = [
    {
      value: 'all',
      title: 'Tous les matériaux',
      isSelected: true,
      content: 'Cette statistique est pour tous les matériaux.'
    },
    {
      value: 'select',
      title: 'sélectionnez des matériaux',
      content: 'Cette statistique est pour des matériaux spécifiques.'
    }
  ]
  const icons: any[] = [
    { icon: 'tabler:database', iconProps: { fontSize: '1.75rem', style: { marginBottom: 8 } } },
    { icon: 'tabler:server', iconProps: { fontSize: '1.75rem', style: { marginBottom: 8 } } }
  ]
  const initialSelected: string = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  // ** State
  const [selected, setSelected] = useState<string>(initialSelected)
  const defaultState: any = {
    endDate: new Date(),
    startDate: new Date()
  }

  // ** States
  const [values, setValues] = useState<any>(defaultState)
  const PickersComponent = forwardRef(({ ...props }: any, ref) => {
    return (
      <CustomTextField
        inputRef={ref}
        fullWidth
        {...props}
        label={props.label || ''}
        sx={{ width: '100%' }}
        error={props.error}
      />
    )
  })
  const handleStartDate = (date: Date) => {
    if (date > values.endDate) {
      setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
    }
  }
  const dispatch = useDispatch<AppDispatch>()
  const store: any = useSelector((state: RootState) => state.material)
  const store2: any = useSelector((state: RootState) => state.pdf)
  const [selectedData, setSelectedData] = useState<any>([])
  const handleStateMaterial = (e: any, selectedData: any) => {
    if (selectedData.length > 0) {
      const newData = selectedData.map((el: any) => el.model)
      setSelectedData(newData)
    } else {
      setSelectedData([])
    }

    // if (selectedData.length > 0) {
    //   setSelectedData([])
    // }
    // if (e) {
    //   e.forEach((element: any) => {
    //     const index = store.data.findIndex((el: any) => el.model == element.props.label)
    //     if (index >= 0) {
    //       setSelectedData((items: any) => [...items, store.data[index]._id])
    //     }
    //     console.log('selectedData : ', selectedData)
    //   })
    // }
  }
  const [type, setType] = useState<any>('')

  useEffect(() => {
    dispatch(
      fetchData({
        search: '',
        page: 1,
        pageSize: 1000,
        sort: 'createdAt'
      })
    )
  }, [dispatch, activeStep])

  const genereTotal = () => {
    let nb = 0
    store2.stat.forEach((el: any) => {
      nb += el.count
    })

    return nb
  }
  const getStepContent = (step: number) => {
    localStorage.setItem('statType', selected)
    switch (step) {
      case 0:
        const handleChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
          if (typeof prop === 'string') {
            setSelected(prop)
          } else {
            setSelected((prop.target as HTMLInputElement).value)
          }
        }

        return (
          <Grid container spacing={5} style={{ justifyContent: 'center', marginTop: '2rem' }}>
            {data.map((item, index) => {
              return (
                <CustomRadioIcons
                  key={index}
                  data={data[index]}
                  selected={selected}
                  icon={icons[index].icon}
                  name='custom-radios-icons'
                  handleChange={handleChange}
                  gridProps={{ sm: 4, xs: 12 }}
                  iconProps={icons[index].iconProps}
                />
              )
            })}

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type='submit'></Button>
              <Button onClick={() => setActiveStep(activeStep + 1)} variant='contained'>
                Suivant
              </Button>
            </Grid>
          </Grid>
        )
      case 1:
        return (
          <form key={1} onSubmit={(e: any) => handleSubmit(e)}>
            <DatePickerWrapper>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {steps[1].title}
                  </Typography>
                  <Typography variant='caption' component='p'>
                    {steps[1].subtitle}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    selectsStart
                    id='event-start-date'
                    endDate={values.endDate as any}
                    selected={values.startDate as any}
                    startDate={values.startDate as any}
                    showTimeSelect={true}
                    locale={fr}
                    dateFormat={'dd/MM/yyyy HH:mm'}
                    customInput={<PickersComponent label='date de début' registername='startDate' />}
                    onChange={(date: Date) => setValues({ ...values, startDate: new Date(date) })}
                    onSelect={handleStartDate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    selectsEnd
                    id='event-end-date'
                    endDate={values.endDate as any}
                    selected={values.endDate as any}
                    minDate={values.startDate as any}
                    startDate={values.startDate as any}
                    showTimeSelect={true}
                    locale={fr}
                    dateFormat={'dd/MM/yyyy HH:mm'}
                    customInput={<PickersComponent label='date de fin' registername='endDate' />}
                    onChange={(date: Date) => setValues({ ...values, endDate: new Date(date) })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    value={type}
                    label='Type du chantier'
                    onChange={(e: any) => setType(e.target.value)}
                    id='stepper-linear-personal-country'
                    aria-describedby='stepper-linear-personal-country-helper'
                  >
                    <MenuItem value='residentiel'>RES/TERT</MenuItem>
                    <MenuItem value='indestrie'>Industrie</MenuItem>
                  </CustomTextField>
                </Grid>
                {selected == 'select' && (
                  <Grid item xs={12} sm={6}>
                    <CustomAutocomplete
                      multiple
                      disableCloseOnSelect
                      onChange={handleStateMaterial}
                      options={store.data}
                      id='autocomplete-checkboxes'
                      getOptionLabel={(option: any) => {
                        return option.model
                      }}
                      renderInput={params => {
                        return (
                          <CustomTextField {...params} label='les matériaux' placeholder='Matériaux sélectionnés...' />
                        )
                      }}
                      renderOption={(props, option, { selected }) => {
                        return (
                          <li {...props}>
                            <Checkbox checked={selected} sx={{ mr: 2 }} />
                            {option.model}
                          </li>
                        )
                      }}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant='tonal' color='secondary' onClick={handleBack}>
                    Retour
                  </Button>
                  <Button onClick={(e: any) => handleSubmit(e)} variant='contained'>
                    Suivant
                  </Button>
                </Grid>
              </Grid>
            </DatePickerWrapper>
          </form>
        )
      case 2:
        return (
          <Grid container spacing={5} style={{ justifyContent: 'center!important' }}>
            {store2.stat.length > 0 ? (
              <>
                <Grid item xs={12} sm={12}>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontSize: '1.5rem !important',
                      px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                      pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                  >
                    Total : {genereTotal()}
                  </Typography>
                </Grid>

                {store2?.stat?.map((el: any, index: number) => {
                  return (
                    <>
                      <Grid item xs={6} sm={6} key={index}>
                        <CustomTextField
                          fullWidth
                          label='type de matériaux'
                          value={el._id}
                          id='form-props-number'
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <CustomTextField
                          type='number'
                          fullWidth
                          label='Quantité'
                          value={el.count}
                          id='form-props-number'
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </>
                  )
                })}
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <Typography sx={{ mb: 2 }}>
                    Oops ! Aucun résultat trouvé pour votre recherche. Veuillez réessayer, ou s'il y a un problème,
                    veuillez contacter le support technique.
                  </Typography>
                </Grid>
              </>
            )}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='tonal' color='secondary' onClick={handleBack}>
                Retour
              </Button>
            </Grid>
          </Grid>
        )

      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained'>Reset</Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  return (
    <>
      <StepperWrapper>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            const labelProps: {
              error?: boolean
            } = {}
            if (index === activeStep) {
              labelProps.error = false
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
      <Divider sx={{ m: '0 !important' }} />

      {renderContent()}
    </>
  )
}

export default StepperLinearWithValidation
