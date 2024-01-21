import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { PolarArea } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'
import DatePicker from 'react-datepicker'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import InputAdornment from '@mui/material/InputAdornment'
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

interface PolarAreaProps {
  info: string
  grey: string
  green: string
  yellow: string
  primary: string
  warning: string
  legendColor: string
}

const ChartjsPolarAreaChart = (props: PolarAreaProps) => {
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

  // ** Props
  const { info, grey, green, yellow, primary, warning, legendColor } = props

  const options: ChartOptions<'polarArea'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: {
        top: -5,
        bottom: -45
      }
    },
    scales: {
      r: {
        grid: { display: false },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 25,
          boxWidth: 9,
          color: legendColor,
          usePointStyle: true
        }
      }
    }
  }
  const store: any = useSelector((state: RootState) => state.user)
  const store2: any = useSelector((state: RootState) => state.material)
  const state: any = useSelector((state: RootState) => state.stat)

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

  const data: ChartData<'polarArea'> = {
    labels: state.data.map((el: any) => el?._id) || [],
    datasets: [
      {
        borderWidth: 0,
        label: 'Population (millions)',
        data: state.data.map((el: any) => el?.count) || [],
        backgroundColor: [primary, yellow, warning, info, grey, green]
      }
    ]
  }
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
    dispatch(
      fetchStatMaterial({
        chantier,
        instalateurs,
        materials,
        startDate,
        endDate
      })
    )
  }, [chantier, instalateurs, materials, startDate, endDate])

  return (
    <Card>
      <CardHeader
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
              <CustomSelect setChantier={setChantier} />
            </Box>
            <Box style={{ width: '100%' }}>
              <CustomInputCheckBox data={store.data} setData={setInstalateurs} />
            </Box>
            <Box style={{ width: '100%' }}>
              <CustomInputCheckBox data={store2.data} isMaterial={true} setData={setmaterials} />
            </Box>
          </Box>
        }
      />
      <CardContent>
        <PolarArea data={data} height={350} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsPolarAreaChart
