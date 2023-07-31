// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports

import StepperLinearWithValidation from 'src/views/forms/form-wizard/StepperLinearWithValidation'

const Constructeur = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h6'>Construction de pdf</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepperLinearWithValidation />
      </Grid>
    </Grid>
  )
}
Constructeur.acl = {
  action: 'read',
  subject: 'constructeur'
}

export default Constructeur
