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
import { updateOrder } from 'src/store/apps/order'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { OrderTypes } from 'src/types/apps/orderDetails'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  order: OrderTypes
}

// interface DataUSer {
//   email: string
//   phone: number
//   fullName: string
//   password: string
//   role: string
//   status: string
// }

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} est obligatoire !`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} doit contenir au moins  ${min} caractères`
  } else {
    return ''
  }
}
const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  address: yup.string().required(),
  codePost: yup.string().required(),
  ville: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .typeError('phone est obligatoir')
    .min(10, obj => showErrors('phone', obj.value.length, obj.min))
    .required(),
  name: yup
    .string()
    .min(3, obj => showErrors('Nom', obj.value.length, obj.min))
    .required()
})

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, order } = props
  const handleDefaultValue = () => {
    let address
    if (order?.address) {
      address = order?.address
    } else {
      address = ''
    }
    let codePost
    if (order?.codePost) {
      codePost = order?.codePost
    } else {
      codePost = ''
    }
    let ville
    if (order?.ville) {
      ville = order?.ville
    } else {
      ville = ''
    }
    let email
    if (order?.email) {
      email = order?.email
    } else {
      email = ''
    }
    let phone
    if (order?.phone) {
      phone = order?.phone
    } else {
      phone = ''
    }
    let name
    if (order?.name) {
      name = order?.name
    } else {
      name = ''
    }

    return { address, codePost, ville, email, phone, name }
  }
  const { address, codePost, ville, email, phone, name } = handleDefaultValue()

  const defaultValues = {
    address,
    codePost,
    ville,
    email,
    phone,
    name
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
    const id: any = order?.id
    dispatch(updateOrder({ ...data, id }))
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
        <Typography variant='h5'>Modefier un Materiel</Typography>
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
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Nom'
                onChange={onChange}
                placeholder='exemple B1,...'
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='email'
                value={value}
                sx={{ mb: 4 }}
                label='Email'
                onChange={onChange}
                placeholder='order@exemple.com'
                error={Boolean(errors.email)}
                {...(errors.email && { helperText: errors.email.message })}
              />
            )}
          />
          <Controller
            name='phone'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Phone'
                onChange={onChange}
                placeholder='numero de telephone'
                error={Boolean(errors.phone)}
                {...(errors.phone && { helperText: errors.phone.message })}
              />
            )}
          />
          <Controller
            name='address'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Address'
                onChange={onChange}
                placeholder='xyz,..'
                error={Boolean(errors.address)}
                {...(errors.address && { helperText: errors.address.message })}
              />
            )}
          />
          <Controller
            name='codePost'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Code Postal'
                onChange={onChange}
                placeholder='Code Postal'
                error={Boolean(errors.codePost)}
                {...(errors.codePost && { helperText: errors.codePost.message })}
              />
            )}
          />
          <Controller
            name='ville'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Ville'
                onChange={onChange}
                placeholder='ville'
                error={Boolean(errors.ville)}
                {...(errors.ville && { helperText: errors.ville.message })}
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
