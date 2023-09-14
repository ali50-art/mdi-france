// ** MUI Imports

import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Types Imports

import { Dialog, DialogTitle, DialogContent, Grid, DialogActions } from '@mui/material'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  data: any
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, data } = props

  const handleClose = () => {
    toggle()
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={toggle}
        aria-labelledby='user-view-edit'
        aria-describedby='user-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, height: '40rem' } }}
      >
        <DialogTitle
          id='user-view-edit'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          matériaux
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          {data.materials?.map((el: any, index: number) => {
            return (
              <Grid container spacing={6} key={index}>
                <Grid item xs={6} sm={6}>
                  <CustomTextField
                    label='type de matériaux'
                    value={el.material.model}
                    id='form-props-number'
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <CustomTextField
                    type='number'
                    label='Quantité'
                    value={el.stock}
                    id='form-props-number'
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            )
          })}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={handleClose}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SidebarAddUser
