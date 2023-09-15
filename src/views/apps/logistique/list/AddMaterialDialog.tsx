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
import { fetchAllData } from 'src/store/apps/material'
import { addCharge } from 'src/store/apps/logistique'

// ** Actions Imports

// import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { Dialog, DialogTitle, DialogContent, Grid, DialogActions } from '@mui/material'
import { useState, useEffect } from 'react'

// import { UsersType } from 'src/types/apps/userTypes'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
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
  const { open, toggle } = props

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchAllData())
  }, [])

  const [init, setInit] = useState<boolean>(false)
  const [material, setMaterail] = useState<any>([{ id: 1, model: 'b1', counter: 1 }])
  const store = useSelector((state: RootState) => state.material)
  const [data, setData] = useState(Object.values(store.data))

  const { reset, handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const onSubmit = () => {
    const materials: any = []
    material.forEach((element: any) => {
      const index = data.findIndex((el: any) => el?.model == element?.model)
      const src: any = data[index]
      const newObj = {
        material: src._id.toString(),
        stock: Number(element?.counter),
        fixedStock: Number(element?.counter)
      }
      materials.push(newObj)
    })
    const type = 'charge'
    const installateurId = localStorage.getItem('instalateurId')
    dispatch(addCharge({ type, materials, instalateurId: installateurId }))
    localStorage.removeItem('material')
    toggle()
    reset()
  }
  const handleChackExistingMAterail = () => {
    const localStorageMaterial: any = localStorage.getItem('marerial')

    if (localStorageMaterial) {
      const newData: any = []
      Object.values(store.data).forEach((el: any) => {
        if (
          JSON.parse(localStorageMaterial)?.findIndex((ele: any) => ele?.model?.toString() == el?.model?.toString()) ==
          -1
        ) {
          const newEl = {
            ...el,
            status: false
          }
          newData.push(newEl)
        } else {
          const newEl = {
            ...el,
            status: true
          }
          newData.push(newEl)
        }
      })
      setData(newData)
    }
  }
  const handleClose = () => {
    toggle()
    reset()
  }

  const handleToLocalStorage = () => {
    const lastId = material[material.length - 1].id
    const newItem = { id: lastId + 1, model: '', counter: 1 }
    setMaterail((prevState: any) => {
      return [...prevState, newItem]
    })
  }

  const initMaterial = () => {
    const materailLocalsStorage = localStorage.getItem('marerial')
    if (!materailLocalsStorage) {
      localStorage.setItem('marerial', JSON.stringify(material))
    } else if (JSON.parse(materailLocalsStorage).length < material.length) {
      localStorage.setItem('marerial', JSON.stringify(material))
    } else if (JSON.parse(materailLocalsStorage).length > 0 && init == false) {
      setInit(true)
      setMaterail(() => {
        return [...JSON.parse(materailLocalsStorage)]
      })
    } else if (JSON.parse(materailLocalsStorage).length > material.length && init == true) {
      localStorage.setItem('marerial', JSON.stringify(material))
    }
    handleChackExistingMAterail()
  }
  const handleDeleteItem = (id: string) => {
    setMaterail((prevState: any) => {
      return prevState.filter((item: any) => item.id !== id)
    })
  }
  const handleSetRole = (val: string, materialId: string) => {
    setMaterail((prevState: any) => {
      return prevState.map((item: any) => (item.id === materialId ? { ...item, model: val } : item))
    })
    localStorage.setItem('marerial', '')
  }
  const handleInputChange = (val: any, id: any) => {
    setMaterail((prevState: any) => {
      return prevState.map((item: any) => (item.id === id ? { ...item, counter: val } : item))
    })
    localStorage.setItem('marerial', '')
  }
  useEffect(() => {
    initMaterial()
  }, [, material])

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
          Sélection des matériaux
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            {material?.map((el: any, index: number) => {
              return (
                <Grid container spacing={6} key={index}>
                  <Grid item xs={6} sm={6}>
                    <CustomTextField
                      select
                      fullWidth
                      value={el.model}
                      sx={{ mb: 4 }}
                      label='type de matériaux'
                      SelectProps={{
                        value: el.model,
                        onChange: e => handleSetRole(e.target.value as string, el.id)
                      }}
                    >
                      {data.map((ele: any) => {
                        if (ele?.status === false) {
                          return (
                            <MenuItem value={ele.model} key={ele.id}>
                              {ele.model}
                            </MenuItem>
                          )
                        } else {
                          return (
                            <MenuItem
                              value={ele.model}
                              key={ele.id}
                              style={{
                                display: 'none'
                              }}
                            >
                              {ele.model}
                            </MenuItem>
                          )
                        }
                      })}
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={3} sm={4}>
                    <CustomTextField
                      type='number'
                      label='Quantité'
                      value={el.counter}
                      id='form-props-number'
                      onChange={e => handleInputChange(e.target.value, el.id)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={3} sm={2}>
                    {index == material.length - 1 ? (
                      <Grid style={{ display: 'flex' }}>
                        <Button
                          variant='contained'
                          style={{
                            height: '2.39rem',
                            marginTop: '1.2rem',
                            marginLeft: '2%',
                            width: '50%'
                          }}
                          onClick={handleToLocalStorage}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='icon icon-tabler icon-tabler-plus'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='#ffffff'
                            fill='none'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          >
                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                            <path d='M12 5l0 14' />
                            <path d='M5 12l14 0' />
                          </svg>
                        </Button>
                        <Button
                          variant='contained'
                          style={{
                            height: '2.39rem',
                            marginTop: '1.2rem',
                            marginLeft: '2%',
                            width: '50%'
                          }}
                          onClick={() => handleDeleteItem(el?.id)}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='icon icon-tabler icon-tabler-trash'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='#ffffff'
                            fill='none'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          >
                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                            <path d='M4 7l16 0' />
                            <path d='M10 11l0 6' />
                            <path d='M14 11l0 6' />
                            <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
                            <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
                          </svg>
                        </Button>
                      </Grid>
                    ) : (
                      <Button
                        variant='contained'
                        style={{
                          height: '2.39rem',
                          marginTop: '1.2rem',
                          marginLeft: '2%'
                        }}
                        onClick={() => handleDeleteItem(el?.id)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-trash'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          stroke-width='1.5'
                          stroke='#ffffff'
                          fill='none'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <path d='M4 7l16 0' />
                          <path d='M10 11l0 6' />
                          <path d='M14 11l0 6' />
                          <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
                          <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
                        </svg>
                      </Button>
                    )}
                  </Grid>
                </Grid>
              )
            })}
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={handleSubmit(onSubmit)}>
              Confirmer
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
