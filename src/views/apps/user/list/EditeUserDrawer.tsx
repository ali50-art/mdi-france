// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
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
import { updateUser } from 'src/store/apps/user'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { UsersType } from 'src/types/apps/userTypes'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  user: UsersType
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
  email: yup.string().email().required(),
  phone: yup
    .number()
    .typeError('phone est obligatoir')
    .min(10, obj => showErrors('phone', obj.value.length, obj.min))
    .required(),
  fullName: yup
    .string()
    .min(3, obj => showErrors('Nome & prenom', obj.value.length, obj.min))
    .required(),
  password: yup
    .string()
    .min(8, obj => showErrors('Mot de pass', obj.value.length, obj.min))
    .required()
})

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, user } = props
  const handleDefaultValue = () => {
    let email
    if (user?.email) {
      email = user?.email
    } else {
      email = ''
    }
    let fullName
    if (user?.fullName) {
      fullName = user?.fullName
    } else {
      fullName = ''
    }
    let phone
    if (user?.phone) {
      phone = Number(user?.phone)
    } else {
      phone = Number(0)
    }
    let password
    if (user?.password) {
      password = user?.password
    } else {
      password = Number(0)
    }

    return { email, fullName, phone, password }
  }
  const { email, fullName, phone, password } = handleDefaultValue()

  const defaultValues = {
    email,
    fullName,
    phone,
    password
  }

  // ** State
  let defaultRole
  if (user?.role) {
    defaultRole = user?.role
  } else {
    defaultRole = ''
  }
  let defaultStatus
  if (user?.status) {
    defaultStatus = user?.status.toString()
  } else {
    defaultStatus = 'true'
  }
  console.log('default status : ', defaultStatus)

  const [role, setRole] = useState<string>(defaultRole)
  const [status, setStatus] = useState<string>(defaultStatus)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // const store = useSelector((state: RootState) => state.user)
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: any) => {
    const id: any = user?.id
    dispatch(updateUser({ ...data, role, id, status }))
    toggle()
    reset()
  }

  const handleClose = () => {
    setRole('')
    setValue('phone', Number(0))
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
        <Typography variant='h5'>Modefier un utilisateur</Typography>
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
            name='fullName'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Nom et prénom'
                onChange={onChange}
                placeholder='exemple...'
                error={Boolean(errors.fullName)}
                {...(errors.fullName && { helperText: errors.fullName.message })}
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
                label='Email'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.email)}
                placeholder='exemple@gmail.com'
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
                type='Phone'
                value={value}
                sx={{ mb: 4 }}
                label='Phone'
                onChange={onChange}
                placeholder='(397) 294-5153'
                error={Boolean(errors.phone)}
                {...(errors.phone && { helperText: errors.phone.message })}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='text'
                value={value}
                sx={{ mb: 4 }}
                label='Mot de pass'
                onChange={onChange}
                placeholder='(397) 294-5153'
                error={Boolean(errors.password)}
                {...(errors.password && { helperText: errors.password.message })}
              />
            )}
          />
          <CustomTextField
            select
            fullWidth
            value={role}
            sx={{ mb: 4 }}
            label='Sélectionnez un rôle'
            onChange={e => setRole(e.target.value)}
            SelectProps={{ value: role, onChange: e => setRole(e.target.value as string) }}
          >
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='logistique'>Logistique</MenuItem>
            <MenuItem value='installateur'>installateur</MenuItem>
            <MenuItem value='assistant'>assistant</MenuItem>
          </CustomTextField>
          <CustomTextField
            select
            fullWidth
            value={status}
            sx={{ mb: 4 }}
            label='Sélectionnez la status'
            onChange={e => setStatus(e.target.value)}
            SelectProps={{ value: status, onChange: e => setStatus(e.target.value as string) }}
          >
            <MenuItem value='true'>Active</MenuItem>
            <MenuItem value='false'>Unactive</MenuItem>
          </CustomTextField>
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
