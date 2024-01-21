import { forwardRef, useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'

// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import InputAdornment from '@mui/material/InputAdornment'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import format from 'date-fns/format'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData as AllUsers } from 'src/store/apps/user'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Box } from '@mui/system'

// ** Custom Components Imports/
import CustomInputCheckBox from '../../../views/forms/inputs/CheckboxesAutoComplete'
import CustomSelect from '../../forms/inputs/customSelect'

// ** Actions Imports
import { fetchData as fetchMaterial } from 'src/store/apps/material'
import { fetchStatMaterial } from 'src/store/apps/state'

const donutColors: any = {
  series1: '#fdd835',
  series2: '#00d4bd',
  series3: '#826bf8',
  series4: '#1FD5EB',
  series5: '#ffa1a1'
}

const ApexDonutChart = () => {
  // ** Hook
  const theme = useTheme()

  // ** States
  const handleOnChange = (dates: any) => {
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)
  }

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const [endDate, setEndDate] = useState<any>(null)
  const [startDate, setStartDate] = useState<any>(null)
  const [materials, setmaterials] = useState([])
  const [instalateurs, setInstalateurs] = useState([])
  const [chantier, setChantier] = useState('')
  const state: any = useSelector((state: RootState) => state.stat)
  const ColorArr: any = []
  let nb = 0
  let j = 1
  for (let i = 0; i < state.data.length; i++) {
    nb += state.data[i].count
    if (j == 6) {
      j = 1
    }
    ColorArr.push(donutColors[`series${j}`])
    j++
  }
  const options: ApexOptions = {
    stroke: { width: 0 },
    labels: state.data.map((el: any) => el?._id) || [],
    colors: ColorArr,
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: (val: string) => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Total',
              formatter: () => `${nb}`,
              color: theme.palette.text.primary
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: theme.typography.body1.fontSize
                  },
                  value: {
                    fontSize: theme.typography.body1.fontSize
                  },
                  total: {
                    fontSize: theme.typography.body1.fontSize
                  }
                }
              }
            }
          }
        }
      }
    ]
  }
  const store: any = useSelector((state: RootState) => state.user)
  const store2: any = useSelector((state: RootState) => state.material)
  const customSelectChnatier: any = [
    {
      label: 'tout',
      value: ''
    },
    {
      label: 'RES/TER',
      value: 'residentiel'
    },
    {
      label: 'Industrie',
      value: 'indestrie'
    }
  ]
  useEffect(() => {
    dispatch(
      AllUsers({
        search: 'instalateur',
        page: 1,
        all: true,
        pageSize: 1000,
        sort: 'createdAt'
      })
    )
    dispatch(
      fetchMaterial({
        page: 1,
        all: true,
        pageSize: 1000,
        sort: 'createdAt'
      })
    )
  }, [dispatch])

  const CustomInput = forwardRef((props: any, ref) => {
    const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <CustomTextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon fontSize='1.25rem' icon='tabler:calendar-event' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Icon fontSize='1.25rem' icon='tabler:chevron-down' />
            </InputAdornment>
          )
        }}
      />
    )
  })
  useEffect(() => {
    let x: any = startDate
    let y: any = endDate
    if (startDate) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + 1)
      x = startDate
    }
    if (endDate) {
      const date = new Date(endDate)
      date.setDate(date.getDate() + 1)
      y = startDate
    }

    dispatch(
      fetchStatMaterial({
        chantier,
        instalateurs,
        materials,
        startDate: x,
        endDate: y
      })
    )
  }, [chantier, instalateurs, materials, startDate, endDate])

  return (
    <Card>
      <CardHeader
        title='Coussin'
        action={
          <Box style={{ display: 'flex', gap: '0.5rem', width: '100%', flexWrap: 'wrap' }}>
            <Box style={{ width: '100%', display: 'flex', gap: '0.5rem' }}>
              <DatePicker
                selectsRange
                endDate={endDate}
                selected={startDate}
                id='recharts-scatter'
                startDate={startDate}
                onChange={handleOnChange}
                placeholderText='Cliquez pour sélectionner une date'
                customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
              />
              <CustomSelect data={customSelectChnatier} haseAll={true} setData={setChantier} />
            </Box>
            <Box style={{ width: '100%' }}>
              <CustomInputCheckBox data={store.data} setData={setInstalateurs} />
            </Box>
            <Box style={{ width: '100%' }}>
              <CustomInputCheckBox data={store2.data} isMaterial={true} setData={setmaterials} />
            </Box>
          </Box>
        }
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
        <ReactApexcharts
          type='donut'
          height={400}
          options={options}
          series={state.data.map((el: any) => el?.count) || []}
        />
      </CardContent>
    </Card>
  )
}

export default ApexDonutChart
