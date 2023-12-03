// ** React Imports
import { useState, useEffect, MouseEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// import { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// import CustomTextField from 'src/@core/components/mui/text-field'

// import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/apps/user'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// import { CardStatsHorizontalWithDetailsProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Imports
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import StatDialog from 'src/views/apps/admin-stat'

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: UsersType
}

// ** renders client column
const userRoleObj: UserRoleType = {
  superAdmin: { icon: 'tabler:device-laptop', color: 'secondary' },
  admin: { icon: 'tabler:device-laptop', color: 'secondary' },
  logisticien: { icon: 'tabler:truck', color: 'success' },
  instalateur: { icon: 'tabler:edit', color: 'info' },
  assistant: { icon: 'tabler:chart-pie-2', color: 'primary' }
}

const userStatusObj: UserStatusType = {
  true: 'success',
  pending: 'warning',
  false: 'error'
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
const renderClient = (row: UsersType) => {
  if (row.avatar) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.fullName ? row.fullName : 'MDI MDI')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }
  const handleOpenEdite = () => {
    handleRowOptionsClose()
    setAddUserOpen(!addUserOpen)
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
          <Icon icon='tabler:chart-dots-3' fontSize={20} />
          genere
        </MenuItem>
      </Menu>
      {addUserOpen && <StatDialog open={addUserOpen} toggle={handleOpenEdite} id={id} />}
    </>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 280,
    field: 'fullName',
    headerName: 'Nom & Prenom',
    renderCell: ({ row }: CellType) => {
      const { fullName, email } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {fullName}
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
    minWidth: 120,
    headerName: 'Téléphone',
    field: 'phone',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.phone}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'role',
    minWidth: 170,
    headerName: 'Role',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar
            skin='light'
            sx={{ mr: 4, width: 30, height: 30 }}
            color={(userRoleObj[row.role]?.color as ThemeColor) || 'primary'}
          >
            <Icon icon={userRoleObj[row.role]?.icon} />
          </CustomAvatar>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.role == 'instalateur' ? 'installateur' : row.role}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.status ? 'Disponible' : 'En tournée'}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
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

const AdminStat = () => {
  // const [status, setStatus] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [page, setPage] = useState<number>(1)
  const [pageSize, setpageSize] = useState<number>(10)
  const handlePageSizeChange = (params: any) => {
    setPage(params.page + 1)
    setpageSize(params.pageSize)
    setPaginationModel({ page: params.page, pageSize: params.pageSize })
  }

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(
      fetchData({
        search: 'instalateur',
        page,
        all: true,
        pageSize,
        sort: 'createdAt'
      })
    )
  }, [dispatch, page, pageSize])

  //   const handleRoleChange = useCallback((e: SelectChangeEvent<unknown>) => {
  //     setRole(e.target.value as string)
  //     setValue(e.target.value as string)
  //   }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader />

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
            paginationMode='server'
            onPaginationModelChange={handlePageSizeChange}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

AdminStat.acl = {
  action: 'manage',
  subject: 'admin-statestique'
}
export default AdminStat
