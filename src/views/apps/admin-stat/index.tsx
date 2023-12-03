// ** MUI Imports

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllData } from 'src/store/apps/material'
import { addCharge } from 'src/store/apps/logistique'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports

// import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, styled } from '@mui/material'
import { useState, useEffect } from 'react'
import StatSteps from './statSteps'

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
    const installateurId = localStorage.getItem('installateurId')
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

  useEffect(() => {
    initMaterial()
  }, [, material])
  const CustomCloseButton = styled(IconButton)<any>(({ theme }) => ({
    top: 0,
    right: 0,
    color: 'grey.500',
    position: 'absolute',
    boxShadow: theme.shadows[2],
    transform: 'translate(10px, -10px)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `${theme.palette.background.paper} !important`,
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    '&:hover': {
      transform: 'translate(7px, -5px)'
    }
  }))

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        maxWidth='xlg'
        scroll='body'
        onClose={toggle}
        aria-labelledby='user-view-edit'
        aria-describedby='user-view-edit-description'
        sx={{ '& .MuiDialog-paper': { overflow: 'visible', height: '80%' } }}
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
          Générez vos statistiques
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <CustomCloseButton onClick={() => toggle()}>
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>
            <StatSteps id={id} />
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          ></DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default SidebarAddUser
