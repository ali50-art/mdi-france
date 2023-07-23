// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const AdminInstalateur = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='partie logistique 🚀'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>page de retour logistique</Typography>
            <Typography>cette page en train de développer merci pour votre consultation</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

AdminInstalateur.acl = {
  action: 'mange',
  subject: 'admin-instalateur'
}
export default AdminInstalateur
