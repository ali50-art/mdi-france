import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { styled } from '@mui/material/styles'
import EcommerceStatistics from '../../views/pages/dashboard/stat'
import Donate from '../../views/pages/dashboard/donate'
import Donate2 from '../../views/pages/dashboard/donate2'
import * as humanize from 'humanize-plus'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Import
import 'chart.js/auto'
import Link from 'next/link'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { dashboardStat } from 'src/store/apps/state'

// const LinkStyled = styled(Link)(({ theme }) => ({
//   textDecoration: 'none',
//   color: theme.palette.primary.main
// }))

// import Image from 'next/image'
const Illustration = styled('img')(({ theme }) => ({
  right: 20,
  bottom: 0,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    right: 5,
    width: 110
  }
}))

const AdminStat = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(dashboardStat())
  }, [])
  const stat: any = useSelector((state: RootState) => state.stat)
  const HandleNumber = (number: any) => {
    if (!number) {
      return humanize.compactInteger(0, 1e3)
    } else {
      return humanize.compactInteger(number, 1e3)
    }
  }

  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'relative' }}>
              <CardContent>
                <Typography variant='h5' sx={{ mb: 0.5 }}>
                  Congratulations Aurelien! 🎉
                </Typography>
                <Typography sx={{ mb: 2, color: 'text.secondary' }}>le Totlal de Coussien utlisé</Typography>
                <Typography variant='h4' sx={{ mb: 0.75, color: 'primary.main' }}>
                  {stat.data3.TotalUsed}
                </Typography>
                <Button variant='contained'>
                  <Link href={'/suivi-chantier'} style={{ textDecoration: 'none', color: '#fff' }}>
                    Suivi les Chantiers
                  </Link>
                </Button>
                <Illustration width={116} alt='congratulations john' src='/images/cards/congratulations-john.png' />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <EcommerceStatistics stat={stat.data3} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Donate />
          </Grid>
          <Grid item xs={12} md={12}>
            <Donate2 />
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

AdminStat.acl = {
  action: 'manage',
  subject: 'admin-statestique'
}
export default AdminStat
