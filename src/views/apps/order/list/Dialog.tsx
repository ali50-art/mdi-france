// // ** React Imports
// import { useState } from 'react'

// // ** MUI Imports
// import Drawer from '@mui/material/Drawer'
// import Button from '@mui/material/Button'
// import MenuItem from '@mui/material/MenuItem'
// import { styled } from '@mui/material/styles'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
// import Box, { BoxProps } from '@mui/material/Box'

// // ** Custom Component Import
// import CustomTextField from 'src/@core/components/mui/text-field'

// // ** Third Party Imports
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useForm, Controller } from 'react-hook-form'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** Store Imports
// import { useDispatch } from 'react-redux'

// // ** Actions Imports
// import { addUser } from 'src/store/apps/user'

// // ** Types Imports
// import { AppDispatch } from 'src/store'

// // import { UsersType } from 'src/types/apps/userTypes'

// interface SidebarAddUserType {
//   open: boolean
//   toggle: () => void
// }

// interface UserData {
//   email: string
//   company: string
//   billing: string
//   country: string
//   phone: number
//   fullName: string
//   username: string
// }

// const showErrors = (field: string, valueLen: number, min: number) => {
//   if (valueLen === 0) {
//     return `${field} est obligatoire !`
//   } else if (valueLen > 0 && valueLen < min) {
//     return `${field} doit contenir au moins  ${min} caractères`
//   } else {
//     return ''
//   }
// }

// const Header = styled(Box)<BoxProps>(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(6),
//   justifyContent: 'space-between'
// }))

// const schema = yup.object().shape({
//   email: yup.string().email().required(),
//   phone: yup
//     .number()
//     .typeError('phone est obligatoir')
//     .min(10, obj => showErrors('phone', obj.value.length, obj.min))
//     .required(),
//   fullName: yup
//     .string()
//     .min(3, obj => showErrors('Nome & prenom', obj.value.length, obj.min))
//     .required()
// })

// const defaultValues = {
//   email: '',
//   company: '',
//   country: '',
//   billing: '',
//   fullName: '',
//   username: '',
//   phone: Number('')
// }

// const SidebarAddUser = (props: SidebarAddUserType) => {
//   // ** Props
//   const { open, toggle } = props

//   // ** State
//   const [role, setRole] = useState<string>('instalateur')

//   // ** Hooks
//   const dispatch = useDispatch<AppDispatch>()

//   // const store = useSelector((state: RootState) => state.user)
//   const {
//     reset,
//     control,
//     setValue,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues,
//     mode: 'onChange',
//     resolver: yupResolver(schema)
//   })
//   const onSubmit = (data: UserData) => {
//     dispatch(addUser({ ...data, role }))
//     toggle()
//     reset()
//   }

//   const handleClose = () => {
//     setRole('subscriber')
//     setValue('phone', Number(''))
//     toggle()
//     reset()
//   }

//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={handleEdit}
//         aria-labelledby='user-view-edit'
//         aria-describedby='user-view-edit-description'
//         sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
//       >
//         <DialogTitle
//           id='user-view-edit'
//           sx={{
//             textAlign: 'center',
//             fontSize: '1.5rem !important',
//             px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
//             pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
//           }}
//         >
//           Edit Mat
//         </DialogTitle>
//         <DialogContent
//           sx={{
//             pb: theme => `${theme.spacing(8)} !important`,
//             px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
//           }}
//         >
//           <form>
//             <Grid container spacing={6}>
//               <Grid item xs={12} sm={6}>
//                 <CustomTextField fullWidth label='Full Name' placeholder='John Doe' defaultValue='ali' />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <CustomTextField
//                   fullWidth
//                   label='Model'
//                   placeholder='Model'
//                   defaultValue='klk'
//                   InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <CustomTextField fullWidth label='ref' defaultValue='ref' placeholder='ref' />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <CustomTextField select fullWidth label='Country' defaultValue='USA'>
//                   <MenuItem value='USA'>USA</MenuItem>
//                   <MenuItem value='UK'>UK</MenuItem>
//                   <MenuItem value='Spain'>Spain</MenuItem>
//                   <MenuItem value='Russia'>Russia</MenuItem>
//                   <MenuItem value='France'>France</MenuItem>
//                   <MenuItem value='Germany'>Germany</MenuItem>
//                 </CustomTextField>
//               </Grid>
//             </Grid>
//           </form>
//         </DialogContent>
//         <DialogActions
//           sx={{
//             justifyContent: 'center',
//             px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
//             pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
//           }}
//         >
//           <Button variant='contained' sx={{ mr: 2 }} onClick={handleEdit}>
//             Modifier
//           </Button>
//           <Button variant='tonal' color='secondary' onClick={handleEdit}>
//             Annuler
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Drawer
//         anchor='right'
//         variant='temporary'
//         onClose={handleClose}
//         ModalProps={{ keepMounted: true }}
//         sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
//       >
//         <Header>
//           <Typography variant='h5'>Ajouter un utilisateur</Typography>
//           <IconButton
//             size='small'
//             onClick={handleClose}
//             sx={{
//               p: '0.438rem',
//               borderRadius: 1,
//               color: 'text.primary',
//               backgroundColor: 'action.selected',
//               '&:hover': {
//                 backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
//               }
//             }}
//           >
//             <Icon icon='tabler:x' fontSize='1.125rem' />
//           </IconButton>
//         </Header>
//         <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Controller
//               name='fullName'
//               control={control}
//               rules={{ required: true }}
//               render={({ field: { value, onChange } }) => (
//                 <CustomTextField
//                   fullWidth
//                   value={value}
//                   sx={{ mb: 4 }}
//                   label='Nom et prénom'
//                   onChange={onChange}
//                   placeholder='exemple...'
//                   error={Boolean(errors.fullName)}
//                   {...(errors.fullName && { helperText: errors.fullName.message })}
//                 />
//               )}
//             />
//             <Controller
//               name='email'
//               control={control}
//               rules={{ required: true }}
//               render={({ field: { value, onChange } }) => (
//                 <CustomTextField
//                   fullWidth
//                   type='email'
//                   label='Email'
//                   value={value}
//                   sx={{ mb: 4 }}
//                   onChange={onChange}
//                   error={Boolean(errors.email)}
//                   placeholder='exemple@gmail.com'
//                   {...(errors.email && { helperText: errors.email.message })}
//                 />
//               )}
//             />
//             <Controller
//               name='phone'
//               control={control}
//               rules={{ required: true }}
//               render={({ field: { value, onChange } }) => (
//                 <CustomTextField
//                   fullWidth
//                   type='Phone'
//                   value={value}
//                   sx={{ mb: 4 }}
//                   label='Phone'
//                   onChange={onChange}
//                   placeholder='(397) 294-5153'
//                   error={Boolean(errors.phone)}
//                   {...(errors.phone && { helperText: errors.phone.message })}
//                 />
//               )}
//             />
//             <CustomTextField
//               select
//               fullWidth
//               value={role}
//               sx={{ mb: 4 }}
//               label='Sélectionnez un rôle'
//               onChange={e => setRole(e.target.value)}
//               SelectProps={{ value: role, onChange: e => setRole(e.target.value as string) }}
//             >
//               <MenuItem value='admin'>Admin</MenuItem>
//               <MenuItem value='logistique'>Logistique</MenuItem>
//               <MenuItem value='instalateur'>Instalateur</MenuItem>
//               <MenuItem value='assistant'>assistant</MenuItem>
//             </CustomTextField>

//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={handleSubmit(onSubmit)}>
//                 sauvegarder
//               </Button>
//               <Button variant='tonal' color='secondary' onClick={handleClose}>
//                 Annuler
//               </Button>
//             </Box>
//           </form>
//         </Box>
//       </Drawer>
//     </>
//   )
// }

// export default SidebarAddUser
