// ** MUI Imports

import Button from '@mui/material/Button'

// ** Types Imports
import { useDispatch } from 'react-redux'

import { AppDispatch } from 'src/store'
import { removeCharge } from 'src/store/apps/logistique'
import { Dialog, DialogTitle, DialogActions } from '@mui/material'

// import { UsersType } from 'src/types/apps/userTypes'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  id: any
  setCount?: any
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, id, setCount } = props

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  const handledelete = () => {
    dispatch(removeCharge({ id }))
    setCount(1)
  }
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
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, height: '12rem' } }}
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
          Êtes-vous sûr de vouloir supprimer le chargement ?
        </DialogTitle>

        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={handledelete}>
            supprimer
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SidebarAddUser
