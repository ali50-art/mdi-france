// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Imports

// ** MUI Imports
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports

import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Actions Imports
import { fetchData, deleteMaterial } from 'src/store/apps/material'

// import authConfig from 'src/configs/auth'
// import { serverUri } from 'src/configs/auth'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// import { CardStatsType } from 'src/@fake-db/types'

import { MaterialTypes } from 'src/types/apps/materialTypes'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddMaterialDrawer from 'src/views/apps/material/list/AddMaterialDrawer'
import EditMertialDrawer from 'src/views/apps/material/list/editMaterialDrawer'

// import EditUserDrawer from 'src/views/apps/user/list/EditeUserDrawer'

interface CellType {
  row: MaterialTypes
}
const formateDate = (date: any) => {
  // Format options for the date in French
  const newData = new Date(date)
  const options: any = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }

  // Format the date using Intl.DateTimeFormat with the French locale
  return new Intl.DateTimeFormat('fr-FR', options).format(newData)
}

// ** renders client column

const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  const store = useSelector((state: RootState) => state.material)

  const [material, setmaterial] = useState<any>({})
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }
  const handleOpenEdite = () => {
    const materialIdex = store?.data.findIndex((el: any) => el.id.toString() === id.toString())
    setmaterial(store?.data[materialIdex])
    handleRowOptionsClose()
    setAddUserOpen(!addUserOpen)
  }
  const handleDelete = () => {
    dispatch(deleteMaterial(id))
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
        <MenuItem onClick={handleOpenEdite} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Éditer
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Supprimer
        </MenuItem>
      </Menu>
      {addUserOpen && <EditMertialDrawer open={addUserOpen} toggle={handleOpenEdite} material={material} />}
    </>
  )
}

const UserList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [page, setPage] = useState<number>(1)
  const [pageSize, setpageSize] = useState<number>(10)

  // Handle Edit dialog
  // const handleEditClickOpen = () => setOpenEdit(true)

  const columns: GridColDef[] = [
    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'Modéle',
      field: 'model',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.model}
          </Typography>
        )
      }
    },

    {
      flex: 0.15,
      minWidth: 190,
      field: 'ref',
      headerName: 'Reference',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.ref}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'createdAt',
      headerName: 'Creé a',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {formateDate(row?.createdAt)}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'updatedAt',
      headerName: 'edite a',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {formateDate(row?.updatedAt)}
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
      renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
    }
  ]

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.material)
  useEffect(() => {
    dispatch(
      fetchData({
        search: value,
        page,
        pageSize,
        sort: 'createdAt'
      })
    )
  }, [dispatch, value, page, pageSize])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handlePageSizeChange = (params: any) => {
    setPage(params.page + 1)
    setpageSize(params.pageSize)

    setPaginationModel({ page: params.page, pageSize: params.pageSize })
  }
  const toggleAddMaterialDrawer = () => setAddUserOpen(!addUserOpen)
  const item: any = {
    stats: 0,
    icon: 'tabler:chart-pie-2',
    subtitle: 'Total des matériaux'
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
          <CardHeader title='' />

          <Divider sx={{ m: '0 !important' }} />
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddMaterialDrawer}
            name='Ajouter un nouveau materiel'
          />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={store?.data}
            loading={store?.isLoading}
            rowCount={store?.total}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePageSizeChange}
          />
        </Card>
      </Grid>

      <AddMaterialDrawer open={addUserOpen} toggle={toggleAddMaterialDrawer} />
    </Grid>
  )
}

UserList.acl = {
  action: 'mange',
  subject: 'material'
}
export default UserList
