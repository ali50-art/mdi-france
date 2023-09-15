// ** MUI Imports

import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/apps/order'
import { updatePdf } from 'src/store/apps/suiveChantier'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { Dialog, DialogTitle, DialogContent, Grid, DialogActions } from '@mui/material'
import { useState, useEffect } from 'react'

// import { UsersType } from 'src/types/apps/userTypes'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  id: any
}

const schema = yup.object().shape({})

const defaultValues = {
  email: '',
  company: '',
  country: '',
  billing: '',
  fullName: '',
  username: '',
  phone: Number('')
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, id } = props
  const sorteMaterail: any = useSelector((state: RootState) => state.suiviChantierPdf)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const [role, setRole] = useState<string>('installateur')

  const store = useSelector((state: RootState) => state.order)
  useEffect(() => {
    dispatch(fetchData({}))
  }, [dispatch, open, toggle])

  const { reset, handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const onSubmit = () => {
    localStorage.setItem('installateurId', role)
    dispatch(updatePdf({ pdfId: id, orderId: role }))
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  // const index=sorteMaterail.findIndex((el:any)=>el)

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
          Sélection le donneurs d'ordre
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                <CustomTextField
                  select
                  fullWidth
                  value={role}
                  sx={{ mb: 4 }}
                  label="les Donner d'order"
                  SelectProps={{ value: role, onChange: e => setRole(e.target.value as string) }}
                >
                  {store.data.map((el: any) => {
                    return (
                      <MenuItem value={el._id} key={el.id}>
                        {el.name}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              </Grid>
            </Grid>
            {sorteMaterail.data?.type == 'indestrie' ? (
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12}>
                  <CustomTextField
                    select
                    fullWidth
                    value={role}
                    sx={{ mb: 4 }}
                    label='Sélectionner'
                    SelectProps={{ value: role, onChange: e => setRole(e.target.value as string) }}
                  >
                    {store.data.map((el: any) => {
                      return (
                        <MenuItem value={el._id} key={el.id}>
                          {el.name}
                        </MenuItem>
                      )
                    })}
                  </CustomTextField>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={handleSubmit(onSubmit)}>
              sélectionner
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Annuler
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default SidebarAddUser
