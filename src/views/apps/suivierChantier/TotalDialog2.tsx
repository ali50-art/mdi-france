// ** MUI Imports

import Button from '@mui/material/Button'

// ** Store Imports
import { useSelector } from 'react-redux'

// ** Types Imports
import { RootState } from 'src/store'
import { Dialog, DialogTitle, DialogContent, Grid, DialogActions } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

// import { UsersType } from 'src/types/apps/userTypes'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  id: any
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  const store = useSelector((state: RootState) => state.pdf)

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
          Total de matériaux utilisés
        </DialogTitle>
        <form>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <Grid container spacing={6}>
              {store.countedData.map((el: any) => {
                return (
                  <>
                    <Grid item xs={6} sm={6}>
                      <CustomTextField
                        label='Matériel utilisé'
                        value={el.model}
                        id='form-props-number'
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={3} sm={4}>
                      <CustomTextField
                        type='number'
                        label='Quantité'
                        value={el.count}
                        id='form-props-number'
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </>
                )
              })}
              <Grid item xs={12} sm={12}></Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Fermer
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default SidebarAddUser
