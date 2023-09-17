import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports

import StepperLinearWithValidation from 'src/views/forms/form-wizard/StepperLinearWithValidation'

const Constructeur = () => {
  const [isActive, isNotActive] = useState<boolean>(false)
  const handlegetItem = () => {
    let x: any = localStorage.getItem('userData')
    x = JSON.parse(x)
    isNotActive(x.status)
  }
  useEffect(() => {
    handlegetItem()
  }, [])
  const content =
    isActive == true ? (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='état récapitulatif 🚀'></CardHeader>
            <CardContent>
              <Typography sx={{ mb: 2 }}>
                Vous n’avez plus de matériaux disponibles. Veuillez contacter votre logisticien pour pouvoir
                commencer votre chantier{' '}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    ) : (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h6'>état récapitulatif</Typography>
        </Grid>
        <Grid item xs={12}>
          <StepperLinearWithValidation />
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
