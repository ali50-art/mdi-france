// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

interface DataType {
  icon: string
  stats: string
  title: string
  color: ThemeColor
}

const EcommerceStatistics = ({ stat }: any) => {
  const data: DataType[] = [
    {
      stats: stat.TotalTraiter,
      title: 'Chantier Traité',
      color: 'primary',
      icon: 'tabler:chart-pie-2'
    },
    {
      color: 'error',
      stats: stat.TotlalNotTraiter,
      title: 'Chantier Non Traité',
      icon: 'tabler:chart-pie-2'
    },
    {
      color: 'success',
      stats: stat.TotalRes,
      title: 'RES/TER',
      icon: 'tabler:shopping-cart'
    },
    {
      stats: stat.TotalInd,
      color: 'success',
      title: 'Industrie',
      icon: 'tabler:shopping-cart'
    }
  ]

  const renderStats = () => {
    return data.map((sale: DataType, index: number) => (
      <Grid item xs={6} md={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar skin='light' color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
            <Icon icon={sale.icon} fontSize='1.5rem' />
          </CustomAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5'>{sale.stats}</Typography>
            <Typography variant='body2'>{sale.title}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }

  return (
    <Card>
      <CardHeader
        title='Statistique'
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
        action={<Typography variant='body2' sx={{ color: 'text.disabled' }}></Typography>}
      />
      <CardContent
        sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(7.5)} !important` }}
      >
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EcommerceStatistics
