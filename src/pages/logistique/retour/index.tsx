// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Imports

// ** MUI Imports
import Card from '@mui/material/Card'

import CustomChip from 'src/@core/components/mui/chip'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
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
import { fetchDataRetour } from 'src/store/apps/logistique'

// import authConfig from 'src/configs/auth'
// import { serverUri } from 'src/configs/auth'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// import { CardStatsType } from 'src/@fake-db/types'

// import { MaterialTypes } from 'src/types/apps/'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/logistique/list/TableHeader'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Dialog from 'src/views/apps/logistique/list/SelectInstalateurDialog'
import ShowAllMaterialDialog from 'src/views/apps/logistique/list/ShowRetourDialog'
import AddMaterialDialog from 'src/views/apps/logistique/list/AddMaterialDialog'
import { Box } from '@mui/system'
import Link from 'next/link'
import { Menu, MenuItem } from '@mui/material'
import { fetchOne } from 'src/store/apps/ChargeDetails'

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
const renderClient = (row: any) => {
  return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
}
const RowOptions = ({ id, chargeDetailId }: { id: number | string; chargeDetailId: any }) => {
  // ** Hooks
  console.log('row?.chargeDetails.length : ', chargeDetailId)
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const store: any = useSelector((state: RootState) => state.chargeDetails)
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
    const handleFetch = async () => {
      await dispatch(fetchOne({ id: chargeDetailId }))
      setShowMaterail(!showMateral)
    }
    handleFetch()
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
          Retour Details
        </MenuItem>
        <Typography
          noWrap
          href={`/logistique/retour/${id}`}
          component={Link}
          sx={{
            fontWeight: 500,
            textDecoration: 'none',
            color: 'text.secondary'
          }}
        >
          <MenuItem sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:file-analytics' fontSize={20} />
            Charge Details
          </MenuItem>
        </Typography>
      </Menu>
      {showMateral && <ShowAllMaterialDialog open={showMateral} toggle={handleShowMaterail} data={store.matData} />}
    </>
  )
}

const UserList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
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

  const columns: GridColDef[] = [
    {
      flex: 0.25,
      minWidth: 70,
      field: 'fullName',
      headerName: 'Installateur',
      renderCell: ({ row }: CellType) => {
        const { fullName, phone } = row.installateurId
        console.log('chargeDetailId : ', row?.chargeDetails)

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
                {fullName}
              </Typography>
              <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                {phone}
              </Typography>
            </Box>
          </Box>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: () => {
        return (
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={'Terminer'}
            color={'error'}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'createAt',
      headerName: 'Creé a',
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
      renderCell: ({ row }: CellType) => (
        <RowOptions id={row._id} chargeDetailId={row?.chargeDetails[row?.chargeDetails.length - 1]} />
      )
    }
  ]

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store: any = useSelector((state: any) => state.logistique)

  useEffect(() => {
    dispatch(
      fetchDataRetour({
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

  const toggleAddMaterialDrawer = () => {
    setAddUserOpen(!addUserOpen)
    if (addUserOpen === false && addUserOpen == false) {
      setAddMaterial(true)
    }
  }
  const toggleAddMaterialDialog = () => {
    setAddMaterial(!addMaterial)
  }
  const counterTotaldeRetour = (arr: any) => {
    let nb = 0
    arr?.forEach((element: any) => {
      element?.retourDetails[0]?.materials.forEach((el: any) => {
        nb += el.stock
      })
    })

    return nb
  }
  const item: any = {
    stats: 0,
    title: 'Retour',
    icon: 'tabler:chart-pie-2',
    subtitle: 'quantité total de matériaux retourné'
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
          <CardHeader title='Filtres de recherche' />
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddMaterialDrawer}
            name='Déclarer un chargement'
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

      <AddMaterialDialog open={addMaterial} toggle={toggleAddMaterialDialog} />
      <Dialog open={addUserOpen} toggle={toggleAddMaterialDrawer} />
    </Grid>
  )
}

UserList.acl = {
  action: 'mange',
  subject: 'logistique'
}
export default UserList
