// ** React Imports

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { updateMateriel } from 'src/store/apps/material'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { MaterialTypes } from 'src/types/apps/materialTypes'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  material: MaterialTypes
}

// interface DataUSer {
//   email: string
//   phone: number
//   fullName: string
//   password: string
//   role: string
//   status: string
// }

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  model: yup.string().required(),
  ref: yup.string().required()
})

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, material } = props
  const handleDefaultValue = () => {
    let model
    if (material?.model) {
      model = material?.model
    } else {
      model = ''
    }
    let ref
    if (material?.ref) {
      ref = material?.ref
    } else {
      ref = ''
    }

    return { model, ref }
  }
  const { model, ref } = handleDefaultValue()

  const defaultValues = {
    model,
    ref
  }

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // const store = useSelector((state: RootState) => state.user)
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: any) => {
    const id: any = material?.id
    dispatch(updateMateriel({ ...data, id }))
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>Modifier un Materiel</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='model'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Modèle'
                onChange={onChange}
                placeholder='exemple B1,...'
                error={Boolean(errors.model)}
                {...(errors.model && { helperText: errors.model.message })}
              />
            )}
          />
          <Controller
            name='ref'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Référence'
                onChange={onChange}
                placeholder='exemple xyz,...'
                error={Boolean(errors.ref)}
                {...(errors.ref && { helperText: errors.ref.message })}
              />
            )}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={handleSubmit(onSubmit)}>
              modifier
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Annuler
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
