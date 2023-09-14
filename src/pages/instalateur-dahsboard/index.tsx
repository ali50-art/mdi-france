// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports

import CardWidgetsEarningReports from 'src/views/ui/cards/widgets/CardWidgetsEarningReports'
import CardWidgetsSupportTracker from 'src/views/ui/cards/widgets/CardWidgetsSupportTracker'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const installateurDahsboard = () => {
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

installateurDahsboard.acl = {
  action: 'read',
  subject: 'installateur-dahsboard'
}

export default installateurDahsboard
