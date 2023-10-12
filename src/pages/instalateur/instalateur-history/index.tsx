// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports

const Constructeur = () => {
  const content = (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='historique état récapitulatif 🚀'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>Cette phrase est en train de se développer.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )

  return content
}
Constructeur.acl = {
  action: 'read',
  subject: 'constructeur'
}

export default Constructeur
