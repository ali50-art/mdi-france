// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports

import CardWidgetsEarningReports from 'src/views/ui/cards/widgets/CardWidgetsEarningReports'
import CardWidgetsSupportTracker from 'src/views/ui/cards/widgets/CardWidgetsSupportTracker'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const InstalateurDahsboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <CardWidgetsEarningReports />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardWidgetsSupportTracker />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

InstalateurDahsboard.acl = {
  action: 'read',
  subject: 'instalateur-dahsboard'
}

export default InstalateurDahsboard
