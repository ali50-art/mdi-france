// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'

import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Utils Import

// ** Custom Components Imports

import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Actions Imports
import { fetchOne } from 'src/store/apps/ChargeDetails'
import { desarge } from 'src/store/apps/logistique'

// import authConfig from 'src/configs/auth'
// import { serverUri } from 'src/configs/auth'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// import { CardStatsType } from 'src/@fake-db/types'

// import { MaterialTypes } from 'src/types/apps/'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import CustomAvatar from 'src/@core/components/mui/avatar'

import AddMaterialDialog from 'src/views/apps/logistique/list/RechargeDialog'
import { Box } from '@mui/system'

// import EditUserDrawer from 'src/views/apps/user/list/EditeUserDrawer'

interface CellType {
  row: any
}

// ** renders client column

const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const store = useSelector((state: RootState) => state.user)
  const router = useRouter()
  const [user, setUser] = useState<any>({})
  console.log(user)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }
  const handleOpenEdite = () => {
    const userIdex = store?.data.findIndex((el: any) => el.id.toString() === id.toString())
    setUser(store?.data[userIdex])
    handleRowOptionsClose()
    setAddUserOpen(!addUserOpen)
  }
  const handleDelete = () => {
    const slug: any = router.query.slug

    dispatch(desarge({ chargeId: slug, id: id }))
    dispatch(fetchOne({ id: id }))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:eye' fontSize={20} />
          voir
        </MenuItem>
        <MenuItem onClick={handleOpenEdite} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
      {/* {addUserOpen && <EditUserDrawer open={addUserOpen} toggle={handleOpenEdite} user={user} />} */}
    </>
  )
}

const UserList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [addMaterial, setAddMaterial] = useState<boolean>(false)

  // Handle Edit dialog
  // const handleEditClickOpen = () => setOpenEdit(true)
  const handleCountTotal = (materials: any) => {
    let nb = 0
    materials?.forEach((el: any) => {
      nb += el.stock
    })

    return nb
  }
  const columns: GridColDef[] = [
    {
      flex: 0.15,
      minWidth: 70,
      field: 'Total',
      headerName: 'Total',
      renderCell: ({ row }: CellType) => {
        return (
          <Box>
            <CustomAvatar skin='light' sx={{ mr: 4, width: 30, height: 30 }} color='info'>
              {handleCountTotal(row?.materials)}
            </CustomAvatar>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'createAt',
      headerName: 'Chargé a',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.updatedAt}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => <RowOptions id={row._id} />
    }
  ]

  const router = useRouter()

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.chargeDetails)
  const id = router.query.slug

  useEffect(() => {
    dispatch(fetchOne({ id: id }))
  }, [dispatch, value, id])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const toggleAddMaterialDialog = () => {
    setAddMaterial(!addMaterial)
  }

  const item: any = {
    stats: 0,
    title: 'Matier',
    icon: 'tabler:chart-pie-2',
    subtitle: 'total de Matier'
  }
  if (store.count >= 0) {
    item.stats = store.count
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Grid item xs={12} md={3} sm={6}>
          <CardStatsHorizontalWithDetails {...item} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Filtres de recherche' />
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddMaterialDialog} name='rechargez' />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={store?.data}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <AddMaterialDialog open={addMaterial} toggle={toggleAddMaterialDialog} />
    </Grid>
  )
}

UserList.acl = {
  action: 'mange',
  subject: 'logistique'
}
export default UserList
