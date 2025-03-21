// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Imports

// ** MUI Imports
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import CustomTextField from 'src/@core/components/mui/text-field'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { fetchData as fetchData2 } from 'src/store/apps/suiviChantierPdf'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports

// ** Actions Imports
import { fetchData } from 'src/store/apps/suiveChantier'

// import authConfig from 'src/configs/auth'
// import { serverUri } from 'src/configs/auth'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// import { CardStatsType } from 'src/@fake-db/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/logistique/list/TableHeader'
import AddMaterialDrawer from 'src/views/apps/material/list/AddMaterialDrawer'
import SelectOrderDialgo from 'src/views/apps/suivierChantier/SelectOrderDialog'
import TotalDialog from 'src/views/apps/suivierChantier/TotalDialog'
import TotalVanneVoie3 from 'src/views/apps/suivierChantier/TotalVanneVoie'
import CustomChip from 'src/@core/components/mui/chip'
import DeleteItemDialog from 'src/views/apps/suivierChantier/DeletePdfConfermation'
import AddBenificaire from 'src/views/apps/suivierChantier/AddBenificaire'
import AddName from 'src/views/apps/suivierChantier/AddName'

// ** Actions Imports
import { fetchData as AllUsers } from 'src/store/apps/user'

import { CardContent } from '@mui/material'

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

const AdminDashboard = () => {
  const [count, setCount] = useState<any>(0)
  const RowOptions = ({ id }: { id: number | string }) => {
    // ** Hooks
    // const dispatch = useDispatch<AppDispatch>()

    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
    const [openTotalModel, setOpenTotalModel] = useState<any>(false)
    const [openTotalVanne, setOpenTotalVanne] = useState<any>(false)
    const [openDeleteTogel, setOpenDeleteTogel] = useState<any>(false)
    const [addBenificaire, setAddBenificaire] = useState<any>(false)
    const [addSiteName, setAddSiteName] = useState<any>(false)
    const rowOptionsOpen = Boolean(anchorEl)
    const dispatch = useDispatch<AppDispatch>()

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }
    const handleOpenEdite = () => {
      dispatch(fetchData2({ id }))
      handleRowOptionsClose()

      setAddUserOpen(!addUserOpen)
    }
    const handleOpenTotal = () => {
      handleRowOptionsClose()
      setOpenTotalModel(!openTotalModel)
    }
    const handleOpenTotalVanne = () => {
      handleRowOptionsClose()
      setOpenTotalVanne(!openTotalVanne)
    }

    const handleOpenDeleteTogel = () => {
      setOpenDeleteTogel(!openDeleteTogel)
      handleRowOptionsClose()
    }
    const handleOpenAddBeneficaire = () => {
      setAddBenificaire(!addBenificaire)
      handleRowOptionsClose()
    }
    const handleOpenAddName = () => {
      setAddSiteName(!addSiteName)
      handleRowOptionsClose()
    }

    // const handleDelete = () => {
    //   dispatch(deleteMaterial(id))
    //   handleRowOptionsClose()
    // }

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
          <Typography
            noWrap
            href={`/suivi-chantier/${id}`}
            component={Link}
            sx={{
              fontWeight: 500,
              textDecoration: 'none',
              color: 'text.secondary'
            }}
          >
            <MenuItem sx={{ '& svg': { mr: 2 } }}>
              <Icon icon='tabler:eye' fontSize={20} />
              Éditer & Télécharger
            </MenuItem>
          </Typography>

          <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleOpenEdite}>
            <Icon icon='tabler:edit' fontSize={20} />
            traité
          </MenuItem>
          <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleOpenAddBeneficaire}>
            <Icon icon='tabler:clipboard' fontSize={20} />
            ajouter bénéficiaire
          </MenuItem>
          <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleOpenAddName}>
            <Icon icon='tabler:clipboard' fontSize={20} />
            ajouter nom de site
          </MenuItem>
          <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleOpenTotal}>
            <Icon icon='tabler:truck' fontSize={20} />
            Total des matériaux
          </MenuItem>
          <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleOpenTotalVanne}>
            <Icon icon='tabler:truck' fontSize={20} />
            Total vanne 3 voie
          </MenuItem>
          <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleOpenDeleteTogel}>
            <Icon icon='tabler:eraser' fontSize={20} />
            supprimer
          </MenuItem>
        </Menu>
        {openTotalModel && <TotalDialog open={openTotalModel} toggle={handleOpenTotal} id={id} />}
        {openTotalVanne && <TotalVanneVoie3 open={openTotalVanne} toggle={handleOpenTotalVanne} id={id} />}
        {addUserOpen && <SelectOrderDialgo open={addUserOpen} toggle={handleOpenEdite} id={id} />}
        {openDeleteTogel && (
          <DeleteItemDialog open={openDeleteTogel} toggle={handleOpenDeleteTogel} id={id} setCount={setCount} />
        )}
        {addBenificaire && <AddBenificaire open={addBenificaire} toggle={handleOpenAddBeneficaire} id={id} />}
        {addSiteName && <AddName open={addSiteName} toggle={handleOpenAddName} id={id} />}
      </>
    )
  }

  // ** State
  const [value, setValue] = useState<string>('')
  const [Type, setType] = useState<string>('')
  const [instalateur, setInstalateur] = useState<any>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 50 })
  const [page, setPage] = useState<number>(1)
  const [pageSize, setpageSize] = useState<number>(50)
  const handleAdress = (address: any) => {
    const arr = address.split(' ')
    if (arr.length == 1) return arr
    let start = 0
    let i = 1
    const finalArr: any = []
    while (i < arr.length) {
      const element = `${arr[start]} ${arr[i]}`
      finalArr.push(element)
      start = i + 1
      if (start == arr.length - 1) {
        finalArr.push(arr[start])
      }
      i += 2
    }

    return finalArr
  }
  const handlePageSizeChange = (params: any) => {
    setPage(params.page + 1)
    setpageSize(params.pageSize)

    setPaginationModel({ page: params.page, pageSize: params.pageSize })
  }
  const handleRoleChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setType(e.target.value as string)
  }, [])
  const handleInstalateurChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setInstalateur(e.target.value as string)
  }, [])

  // Handle Edit dialog
  // const handleEditClickOpen = () => setOpenEdit(true)
  const returnedType = (row: any) => {
    if (row?.type == 'indestrie') {
      return 'industrie'
    } else {
      return 'RES/TERT'
    }
  }
  const columns: GridColDef[] = [
    {
      flex: 0.15,
      minWidth: 90,
      headerName: 'Nom',
      field: 'Name',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.clientName}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 160,
      headerName: 'adresse',
      field: 'adresse',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {handleAdress(row.clientAdress).map((el: any) => {
              return (
                <>
                  {el} <br />
                </>
              )
            })}
          </Typography>
        )
      }
    },

    {
      flex: 0.15,
      minWidth: 190,
      field: 'date',
      headerName: 'Date',
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
      field: 'installateur',
      headerName: 'Installateur',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.instalateurId?.fullName}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'type',
      headerName: "Type d'implantation",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {returnedType(row)}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'Code Postal',
      headerName: 'Code Postal',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.clientCodePostal}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Statut',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={row?.orderDetailId?.length > 0 ? 'traité' : 'non traité'}
            color={row?.orderDetailId?.length > 0 ? 'success' : 'error'}
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

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.suiveChantier)
  const store2 = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(
      fetchData({
        search: value,
        status: Type,
        instalateur,
        page,
        pageSize,
        sort: '-createdAt'
      })
    )
    dispatch(
      AllUsers({
        search: 'instalateur',
        page,
        all: true,
        pageSize,
        sort: 'createdAt'
      })
    )
  }, [dispatch, value, Type, instalateur, page, pageSize, count])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const toggleAddMaterialDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='filter'
                  SelectProps={{
                    value: Type,
                    displayEmpty: true,
                    onChange: e => handleRoleChange(e)
                  }}
                >
                  <MenuItem value=''>Sélectionnez un statut</MenuItem>
                  <MenuItem value='true'>traité</MenuItem>
                  <MenuItem value='false'>Non traité</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue=''
                  SelectProps={{
                    value: instalateur,
                    displayEmpty: true,
                    onChange: e => handleInstalateurChange(e)
                  }}
                >
                  <MenuItem value=''>Sélectionnez un installateur</MenuItem>
                  {store2.data.map((el: any) => {
                    return (
                      <MenuItem value={el._id} key={el._id}>
                        {el.fullName}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddMaterialDrawer}
            name='Ajouter un nouvel'
          />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={store.data}
            loading={store.isLoading}
            rowCount={store.total}
            columns={columns}
            disableRowSelectionOnClick
            paginationMode='server'
            pageSizeOptions={[50, 100, 150]}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePageSizeChange}
          />
        </Card>
      </Grid>

      <AddMaterialDrawer open={addUserOpen} toggle={toggleAddMaterialDrawer} />
    </Grid>
  )
}

AdminDashboard.acl = {
  action: 'read',
  subject: 'suivi-chantier'
}

export default AdminDashboard
