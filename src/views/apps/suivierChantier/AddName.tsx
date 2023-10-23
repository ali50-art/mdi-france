// ** MUI Imports

import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import toast from 'react-hot-toast'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

// ** Store Imports
import { editPdf } from 'src/store/apps/suiveChantier'

import { useDispatch } from 'react-redux'

// ** Actions Imports
// import { updatePdf } from 'src/store/apps/suiveChantier'

import { AppDispatch } from 'src/store'
import { Card, CardContent, CardHeader, Dialog, Grid } from '@mui/material'

// import { UsersType } from 'src/types/apps/userTypes'

const defaultValues = {
  name: '',
  Ville: '',
  adresse: '',
  codePostal: ''
}
interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  id: any
}
const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} Champ requis`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} doit être au moins ${min} caractères`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, obj => showErrors('nom de bénéficiaire', obj.value.length, obj.min))
    .required(),
  Ville: yup
    .string()
    .min(3, obj => showErrors('ville', obj.value.length, obj.min))
    .required(),
  adresse: yup
    .string()
    .min(3, obj => showErrors('adresse', obj.value.length, obj.min))
    .required(),
  codePostal: yup
    .string()
    .matches(/^[0-9]+$/, 'ce champ doit inclure deux chiffres')
    .min(4, obj => showErrors('code postal', obj.value.length, obj.min))
    .required()
})

const FormValidationSchema = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, id } = props

  // ** Hook
  const dispatch = useDispatch<AppDispatch>()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {
    dispatch(
      editPdf({
        pdfId: id,
        clientVille: data.Ville,
        clientCodePostal: data.codePostal,
        clientAdress: data.adresse,
        clientName: data.name
      })
    )
    toggle()
    toast.success('nom de site ajouté avec succès.')
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
        <Card>
          <CardHeader title='Ajouter Nom de site ' />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='Nom'
                        onChange={onChange}
                        placeholder='nom du site'
                        error={Boolean(errors.Ville)}
                        aria-describedby='validation-schema-first-name'
                        {...(errors.name && { helperText: errors.name.message })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='Ville'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='ville'
                        onChange={onChange}
                        placeholder='ville'
                        error={Boolean(errors.Ville)}
                        aria-describedby='validation-schema-first-name'
                        {...(errors.Ville && { helperText: errors.Ville.message })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='adresse'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='Adresse'
                        onChange={onChange}
                        placeholder='adresse'
                        error={Boolean(errors.adresse)}
                        aria-describedby='validation-schema-last-name'
                        {...(errors.adresse && { helperText: errors.adresse.message })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='codePostal'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        label='code postal'
                        onChange={onChange}
                        error={Boolean(errors.codePostal)}
                        placeholder='code postal'
                        aria-describedby='validation-schema-email'
                        {...(errors.codePostal && { helperText: errors.codePostal.message })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type='submit' variant='contained'>
                    envoyer
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Dialog>
    </>
  )
}

export default FormValidationSchema
