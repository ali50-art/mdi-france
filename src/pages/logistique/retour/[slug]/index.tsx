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
import { fetchAllByChargeId, fetchRetourOfOneCharge } from 'src/store/apps/ChargeDetails'

// import authConfig from 'src/configs/auth'
// import { serverUri } from 'src/configs/auth'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// import { CardStatsType } from 'src/@fake-db/types'

// import { MaterialTypes } from 'src/types/apps/'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/logistique/list/TableHeaderWithButton'
import CustomAvatar from 'src/@core/components/mui/avatar'

import ShowAllMaterialDialog from 'src/views/apps/logistique/list/ShowMaterialDialog'
import RechargeDialog from 'src/views/apps/logistique/list/RechargeDialog'
import { Box } from '@mui/system'

// import EditUserDrawer from 'src/views/apps/user/list/EditeUserDrawer'

interface CellType {
  row: any
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
  const store = useSelector((state: RootState) => state.chargeDetails)
  const [showMateral, setShowMaterail] = useState<any>(false)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleShowMaterail = () => {
    handleRowOptionsClose()
    dispatch(fetchRetourOfOneCharge({ id: id }))
    setShowMaterail(!showMateral)
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
        <MenuItem onClick={handleShowMaterail} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:eye' fontSize={20} />
          voir
        </MenuItem>
      </Menu>
      {showMateral && (
        <ShowAllMaterialDialog
          open={showMateral}
          toggle={handleShowMaterail}
          data={store.matDataOneCharge}
          isRetour={true}
        />
      )}
    </>
  )
}

const UserList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [addMaterial, setAddMaterial] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setpageSize] = useState<number>(10)
  const handlePageSizeChange = (params: any) => {
    setPage(params.page + 1)
    setpageSize(params.pageSize)

    setPaginationModel({ page: params.page, pageSize: params.pageSize })
  }

  // Handle Edit dialog
  // const handleEditClickOpen = () => setOpenEdit(true)
  const handleCountTotal = (materials: any) => {
    let nb = 0
    materials?.forEach((el: any) => {
      nb += el.fixedStock
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
            {formateDate(row?.createdAt)}
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
    const params = {
      search: value,
      page,
      pageSize,
      sort: '-createdAt'
    }
    dispatch(fetchAllByChargeId({ id: id, params }))
  }, [dispatch, value, id, page, pageSize])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const toggleAddMaterialDialog = () => {
    setAddMaterial(!addMaterial)
  }

  const counterTotaldeRetour = (arr: any) => {
    let nb = 0
    arr?.forEach((element: any) => {
      element?.materials.forEach((el: any) => {
        nb += el.stock
      })
    })

    return nb
  }
  const item: any = {
    stats: 0,
    title: 'Charge details',
    icon: 'tabler:chart-pie-2',
    subtitle: 'contiter total de Charge'
  }
  if (store.data.length >= 0) {
    item.stats = counterTotaldeRetour(store.data)
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
            toggle={toggleAddMaterialDialog}
            withName={false}
            url='/logistique/retour/'
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
      <RechargeDialog open={addMaterial} toggle={toggleAddMaterialDialog} />
    </Grid>
  )
}

UserList.acl = {
  action: 'mange',
  subject: 'logistique'
}
export default UserList
