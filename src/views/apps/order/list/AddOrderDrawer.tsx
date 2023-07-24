// ** React Imports
import { useState, ElementType } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button, { ButtonProps } from '@mui/material/Button'
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
import { addOrder } from 'src/store/apps/order'

// ** Types Imports
import { AppDispatch } from 'src/store'

// import { UsersType } from 'src/types/apps/userTypes'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

interface orderData {
  name: string
  email: string
  phone: string
  address: string
  codePost: string
  ville: string
}
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
const ImgStyled = styled('img')(({ theme }) => ({
  width: 50,
  height: 50,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))
const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(2)
  }
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

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  codePost: '',
  ville: ''
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** State

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const [inputValue, setInputValue] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>(`${process.env.NEXT_PUBLIC_SERVER_URI}/orderDetails/default.png`)
  const handleInputImageChange = (file: any) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setInputValue(reader.result as string)
      }
    }
  }

  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc(`${process.env.NEXT_PUBLIC_SERVER_URI}/orderDetails/default.png`)
  }

  // const handleFormChange = (field: keyof Data, value: Data[keyof Data]) => {
  //   setFormData({ ...formData, [field]: value })
  // }

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
  const onSubmit = (data: orderData) => {
    const foromData = new FormData()

    foromData.append('name', data.name)
    foromData.append('email', data.email)
    foromData.append('address', data.address)
    foromData.append('phone', data.phone)
    foromData.append('codePost', data.codePost)
    foromData.append('ville', data.ville)
    foromData.append('file', inputValue)

    dispatch(addOrder(foromData))
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
        <Typography variant='h5'>Ajouter un Order</Typography>
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
          <Box sx={{ alignItems: 'center' }}>
            <ImgStyled src={imgSrc} alt='Profile Pic' />
            <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Ajouter un logo +
                <input
                  hidden
                  type='file'
                  value={inputValue}
                  accept='image/png, image/jpeg'
                  onChange={handleInputImageChange}
                  id='account-settings-upload-image'
                />
              </ButtonStyled>
              <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImageReset}>
                Reset
              </ResetButtonStyled>
            </Box>
          </Box>
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
              sauvegarder
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
