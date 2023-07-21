// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const AdminDashboard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Admin dashboard 🚀'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>Tous les gestion de midi serent affiche dans cette page</Typography>
            <Typography>cette page en train de développer merci pour votre consultation</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
AdminDashboard.acl = {
  action: 'read',
  subject: 'admin-dahsboard'
}

export default AdminDashboard
