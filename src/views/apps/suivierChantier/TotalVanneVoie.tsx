// ** MUI Imports

import Button from '@mui/material/Button'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchTotalVanneVoie3 } from 'src/store/apps/pdf'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { Dialog, DialogTitle, DialogContent, Grid, DialogActions } from '@mui/material'
import { useEffect } from 'react'
import CustomTextField from 'src/@core/components/mui/text-field'

// import { UsersType } from 'src/types/apps/userTypes'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  id: any
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, id } = props

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchTotalVanneVoie3({ id }))
  }, [dispatch, id])
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
          Total de Type de point singulier
        </DialogTitle>
        <form>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <Grid container spacing={6}>
              {store?.TotalVanneVoie.map((el: any) => {
                return (
                  <>
                    <Grid item xs={5} sm={5}>
                      <CustomTextField
                        label='Type de point singulier'
                        value={el?.type}
                        id='form-props-number'
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                      <CustomTextField
                        label='Matériel utilisé'
                        value={el?.model}
                        id='form-props-number'
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    <Grid item xs={3} sm={3}>
                      <CustomTextField
                        label='Quantité'
                        value={el?.count}
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
