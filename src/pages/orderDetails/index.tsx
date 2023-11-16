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

import { getInitials } from 'src/@core/utils/get-initials'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Actions Imports
import { fetchData, deleteorderDetails } from 'src/store/apps/order'

// import authConfig from 'src/configs/auth'
// import { serverUri } from 'src/configs/auth'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// import { CardStatsType } from 'src/@fake-db/types'

import { OrderTypes } from 'src/types/apps/orderDetails'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddOrderDrawer from 'src/views/apps/order/list/AddOrderDrawer'
import EditOrderDrawer from 'src/views/apps/order/list/editOrderDrawer'
import { Box } from '@mui/system'

// import EditUserDrawer from 'src/views/apps/user/list/EditeUserDrawer'

interface CellType {
  row: OrderTypes
}

// const formateDate = (date: any) => {
//   // Format options for the date in French
//   const newData = new Date(date)
//   const options: any = {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit'
//   }

//   // Format the date using Intl.DateTimeFormat with the French locale
//   return new Intl.DateTimeFormat('fr-FR', options).format(newData)
// }

// ** renders client column
const renderClient = (row: OrderTypes) => {
  if (row.photo) {
    return (
      <CustomAvatar
        src={`${process.env.NEXT_PUBLIC_SERVER_URI}/orderDetails/${row.photo}`}
        sx={{ mr: 2.5, width: 38, height: 38 }}
      />
    )
  } else {
    return (
      <CustomAvatar
        skin='light'
        sx={{
          mr: 2.5,
          width: 38,
          height: 38,
          fontWeight: 500,
          fontSize: (theme: any) => theme.typography.body1.fontSize
        }}
      >
        {getInitials(row.name ? row.name : 'Missing !')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  const store = useSelector((state: RootState) => state.order)

  const [order, setorder] = useState<any>({})
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }
  const handleOpenEdite = () => {
    const orderIdex = store?.data.findIndex((el: any) => el.id.toString() === id.toString())
    setorder(store?.data[orderIdex])
    handleRowOptionsClose()
    setAddUserOpen(!addUserOpen)
  }
  const handleDelete = () => {
    dispatch(deleteorderDetails(id))
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
      {addUserOpen && <EditOrderDrawer open={addUserOpen} toggle={handleOpenEdite} order={order} />}
    </>
  )
}
const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 280,
    field: 'name',
    headerName: "donneur d'ordre",
    renderCell: ({ row }: CellType) => {
      const { name, email } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary'
              }}
            >
              {name}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.15,
    minWidth: 190,
    field: 'phone',
    headerName: 'Téléphone',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row?.phone}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'address',
    headerName: 'Adresse',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row?.address}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'codePost',
    headerName: 'Code Postal',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row?.codePost}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'ville',
    headerName: 'Ville',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row?.ville}
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
const UserList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [page, setPage] = useState<number>(1)
  const [pageSize, setpageSize] = useState<number>(10)
  const handlePageSizeChange = (params: any) => {
    setPage(params.page + 1)
    setpageSize(params.pageSize)

    setPaginationModel({ page: params.page, pageSize: params.pageSize })
  }

  // Handle Edit dialog
  // const handleEditClickOpen = () => setOpenEdit(true)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store: any = useSelector((state: RootState) => state.order)
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

  const toggleAddOrderDrawer = () => setAddUserOpen(!addUserOpen)
  const item: any = {
    stats: 0,
    icon: 'tabler:chart-pie-2',
    subtitle: "total des donneurs d'ordres"
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
            toggle={toggleAddOrderDrawer}
            name="Ajouter un donneur d'ordre"
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
            paginationMode='server'
            paginationModel={paginationModel}
            onPaginationModelChange={handlePageSizeChange}
          />
        </Card>
      </Grid>
      <AddOrderDrawer open={addUserOpen} toggle={toggleAddOrderDrawer} />
    </Grid>
  )
}

UserList.acl = {
  action: 'mange',
  subject: 'orderDetails'
}
export default UserList
