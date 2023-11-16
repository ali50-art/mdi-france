// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { getStoreData, addData, updateDataById, Stores, deleteData } from '../../../lib/db'
import { VariableSizeList as List } from 'react-window'
import TableRow from '@mui/material/TableRow'

// import AutoSizer from 'react-virtualized-auto-sizer'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Grid, { GridProps } from '@mui/material/Grid'

import TableContainer from '@mui/material/TableContainer'
import { styled, useTheme } from '@mui/material/styles'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import MenuItem from '@mui/material/MenuItem'

// ** Types

// ** Custom Component Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import { toast } from 'react-hot-toast'

interface Props {
  toggleAddCustomerDrawer: () => void
  invoiceNumber: number
  clients: any[] | undefined
  selectedClient: any | null
  setSelectedClient: (val: any | null) => void
  handleSetCount: any
  count2: number
}

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  '&:not(:last-child)': {
    paddingRight: `${theme.spacing(2)} !important`
  }
}))

const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-2.375rem',
    position: 'absolute'
  },
  [theme.breakpoints.down('md')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const InvoiceAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const AddCard = (props: Props) => {
  // ** Props
  const listArr = new Array(300).fill(0).map((v, idx) => idx)
  const { handleSetCount } = props
  const [materials, setMaterial] = useState<any>([])

  // ** States
  const [count, setCount] = useState<number>(0)

  const [data, setData] = useState<any[]>(listArr)
  const [data2, setData2] = useState<any[]>([])
  const [lastId, setlastId] = useState<any>(null)

  // ** Hook
  const theme = useTheme()

  // ** Deletes form
  const countStock = (data: any, model: any) => {
    let nb = 0
    data.forEach((el: any) => {
      if (el.red == model) {
        nb += 1
      }
    })

    return nb
  }
  const handleMaterilas = async (data: any) => {
    if (localStorage.getItem('userData')) {
      const x: any = localStorage.getItem('userData')
      const user: any = JSON.parse(x)
      const newMaterial: any = []
      user.charge.materials.forEach((element: any) => {
        const stockNb = countStock(data, element.material.model)

        if (stockNb < element.stock) {
          newMaterial.push(element)
        }
      })
      setMaterial(newMaterial)
    }
  }
  const handleFetchData = async () => {
    try {
      const res: any = await getStoreData(Stores.PdfData2)

      const res2 = await getStoreData(Stores.PdfInfo)

      if (res.length > 0) {
        setData(res)
        setlastId(res[res.length - 1].id)
      } else {
        setlastId(0)
        setData([])
      }

      await handleMaterilas(res)
      setData2(res2)
    } catch (err) {
      toast.error('opps !')
    }
  }

  const handleAddNewItem = async () => {
    if (materials.length == 0) {
      toast.error('voter stock est terminer !')

      return
    } else {
      let id = Number(localStorage.getItem('lastId'))
      if (!id) {
        id = 1
        localStorage.setItem('lastId', JSON.stringify(id))
      } else {
        id += 1
        localStorage.setItem('lastId', JSON.stringify(id))
      }
      try {
        let rep
        if (localStorage.getItem('rep')) {
          rep = Number(localStorage.getItem('rep')) + 1
        } else {
          rep = 1
        }
        const newData = {
          local: '',
          type: '',
          red: '',
          rep: rep,
          nature: '',
          categoryId: JSON.stringify(new Date()),
          saved: false
        }
        await addData(Stores.PdfData2, { ...newData, id })
        localStorage.setItem('rep', '0')
        toast.success('vos avez ajoutez noveux ligine')
        setCount(count + 1)
        handleSetCount()
        handleFetchData()
      } catch (err: any) {
        toast.error('opps !')
      }
    }
  }
  const handleDeleteItem = async (id: any, categoryId: any) => {
    const arr = data.filter((el: any) => el.categoryId == categoryId)

    const index = arr.findIndex((ele: any) => ele.id.toString() == id.toString())

    for (let i = index + 1; i < arr.length; i++) {
      const lastData = arr[i]

      lastData.rep -= 1
      updateDataById(Stores.PdfData2, arr[i].id, { ...lastData })
    }
    const locaId = Number(localStorage.getItem('lastId'))
    if (locaId == id) {
      const newID = locaId - 1
      localStorage.setItem('lastId', JSON.stringify(newID))
    }
    await deleteData(Stores.PdfData2, id)

    setCount(count + 1)
    handleSetCount()
  }
  const handleSaveItem = async (id: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.saved = true
    await updateDataById(Stores.PdfData2, id, { ...lastData })
    setCount(count + 1)
    handleSetCount()
  }
  const handleSetFilter = async (id: any, d: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.type = d
    await updateDataById(Stores.PdfData2, id, { ...lastData })
    setCount(count + 1)
    handleSetCount()
  }
  const handleSetNature = async (id: any, d: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.nature = d
    await updateDataById(Stores.PdfData2, id, { ...lastData })
    setCount(count + 1)
    handleSetCount()
  }
  const hnadlesetRef = async (id: any, d: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.red = d
    await updateDataById(Stores.PdfData2, id, { ...lastData })
    setCount(count + 1)
    handleSetCount()
  }
  const handleChangeMood = async (id: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.saved = false
    await updateDataById(Stores.PdfData2, id, { ...lastData })
    setCount(count + 1)
    handleSetCount()
  }

  const handleSetInput = async (e: any, id: any, d: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())
    const lastData = data[index]
    lastData.local = d
    await updateDataById(Stores.PdfData2, id, { ...lastData })

    e.preventDefault()
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
  const handleAddNewLine = async () => {
    if (materials.length == 0) {
      toast.error('voter stock est terminer !')

      return
    } else {
      const id = Number(localStorage.getItem('lastId'))

      const index = data.findIndex((el: any) => el.id.toString() == id.toString())

      const lastData = data[index]
      if (lastData?.local == '' || lastData?.red == '' || lastData?.type == '') {
        toast.error('completez le premier linge stp !')

        return
      }
      try {
        lastData.rep += 1
        lastData.id += 1
        lastData.type = ''
        lastData.red = ''
        lastData.nature = ''
        lastData.saved = false
        await addData(Stores.PdfData2, { ...lastData })
        localStorage.setItem('lastId', JSON.stringify(id + 1))
        setCount(count + 1)
        handleSetCount()
        handleFetchData()
      } catch (err) {
        toast.error('opps !')
      }
    }
  }
  const ceckTheList = (arr: any, model: any) => {
    const index = arr.findIndex((el: any) => el.material.model == model)

    return index > -1
  }

  const Row = ({ index, style, data }: any) => {
    const i = index

    return (
      <>
        <Grid container>
          <RepeatingContent item xs={12} style={style}>
            <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
              <Grid item lg={2.75} md={2.75} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                <CustomTextField
                  placeholder="Zone d'implantation"
                  onChange={e => handleSetInput(e, data[i].id, e.target.value)}
                  defaultValue={data[i].local}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item lg={2.75} md={2.75} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                {data[i].saved ? (
                  <CustomTextField placeholder='1' value={data[i].type} InputProps={{ inputProps: { min: 0 } }} />
                ) : (
                  <CustomTextField
                    select
                    fullWidth
                    value={data[i].type}
                    sx={{ mb: 4 }}
                    onChange={e => handleSetFilter(data[i].id, e.target.value)}
                    SelectProps={{
                      value: data[i].type,
                      onChange: e => handleSetFilter(data[i].id, e.target.value)
                    }}
                  >
                    <MenuItem value='Vanne Bs'>Vanne Bs</MenuItem>
                    <MenuItem value='Jeux de brides'>Jeux de brides</MenuItem>
                    <MenuItem value="Purgeur d'air fileté">Purgeur d'air fileté</MenuItem>
                    <MenuItem value='Vanne papillon'>Vanne papillon</MenuItem>
                    <MenuItem value='Vanne TA filetée'>Vanne TA filetée</MenuItem>
                    <MenuItem value='Filtre bride'>Filtre bride </MenuItem>
                    <MenuItem value='Robinet volant fileté'>Robinet volant fileté</MenuItem>
                    <MenuItem value='Manchette de dilatation filetée'>Manchette de dilatation filetée</MenuItem>
                    <MenuItem value='Clapet fileté'>Clapet fileté</MenuItem>
                    <MenuItem value='Filter fileté'>Filter fileté</MenuItem>
                    <MenuItem value='Circulateur fileté'>Circulateur fileté</MenuItem>
                    <MenuItem value="Purgeur d'eau fileté">Purgeur d'eau fileté</MenuItem>
                    <MenuItem value='Compteur fileté'>Compteur fileté</MenuItem>
                    <MenuItem value='Vanne PAP Elec.motorisée'>Vanne PAP Elec.motorisée</MenuItem>
                    <MenuItem value='Vanne volant large bride'>Vanne volant large bride</MenuItem>
                    <MenuItem value='Vanne volante étroite bride'>Vanne volante étroite bride</MenuItem>
                    <MenuItem value="Manchette d'écartement bride">Manchette d'écartement bride</MenuItem>
                    <MenuItem value='Circulateur simple bride'>Circulateur simple bride</MenuItem>
                    <MenuItem value='Vanne TA bride'>Vanne TA bride</MenuItem>
                    <MenuItem value='Compteur bride'>Compteur bride </MenuItem>
                  </CustomTextField>
                )}
              </Grid>
              <Grid item lg={2.75} md={2.75} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                {data[i].saved ? (
                  <CustomTextField placeholder='1' value={data[i].red} InputProps={{ inputProps: { min: 0 } }} />
                ) : (
                  <CustomTextField
                    select
                    fullWidth
                    value={data[i].red}
                    sx={{ mb: 4 }}
                    onChange={e => hnadlesetRef(data[i].id, e.target.value)}
                    SelectProps={{
                      value: data[i].red,
                      onChange: e => hnadlesetRef(data[i].id, e.target.value)
                    }}
                  >
                    {data[i].red != '' ? (
                      ceckTheList(materials, data[i].red) == false ? (
                        <MenuItem value={data[i].red} key={i}>
                          {data[i].red}
                        </MenuItem>
                      ) : null
                    ) : null}
                    {materials?.map((el: any, i: number) => {
                      return (
                        <MenuItem value={el?.material?.model} key={i}>
                          {el?.material?.model}
                        </MenuItem>
                      )
                    })}
                  </CustomTextField>
                )}
              </Grid>

              <Grid item lg={2.75} md={2.75} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                {data[i].saved ? (
                  <CustomTextField value={data[i].nature} InputProps={{ inputProps: { min: 0 } }} />
                ) : (
                  <CustomTextField
                    select
                    fullWidth
                    value={data[i].nature}
                    sx={{ mb: 4 }}
                    onChange={e => handleSetNature(data[i].id, e.target.value)}
                    SelectProps={{
                      value: data[i].nature,
                      onChange: e => handleSetNature(data[i].id, e.target.value)
                    }}
                  >
                    <MenuItem value='vapeur'>vapeur</MenuItem>
                    <MenuItem value='Eau surchauffée'>Eau surchauffée</MenuItem>
                    <MenuItem value='Fluide organique'>Fluide organique</MenuItem>
                  </CustomTextField>
                )}
              </Grid>

              <Grid item lg={1} md={1} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                <CustomTextField placeholder='1' value={data[i].rep} InputProps={{ inputProps: { min: 0 } }} />
              </Grid>
            </Grid>
            <InvoiceAction>
              <IconButton size='small' onClick={() => handleDeleteItem(data[i].id, data[i].categoryId)}>
                <Icon icon='tabler:x' fontSize='1.25rem' />
              </IconButton>
              <Divider />
              {data[i].saved ? (
                <IconButton size='small' onClick={() => handleChangeMood(data[i].id)}>
                  <Icon icon='tabler:edit' fontSize='1.25rem' />
                </IconButton>
              ) : (
                <IconButton size='small' onClick={() => handleSaveItem(data[i].id)}>
                  <Icon icon='tabler:check' fontSize='1.25rem' />
                </IconButton>
              )}
            </InvoiceAction>
          </RepeatingContent>
        </Grid>
      </>
    )
  }
  useEffect(() => {
    handleFetchData()

    localStorage.setItem('lastId', lastId)
  }, [, count, getStoreData, addData])

  return (
    <Card>
      <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
        <Grid container>
          <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ ml: 2.5, fontWeight: 700, lineHeight: '24px' }}>
                  a l'adresse du site
                </Typography>
              </Box>
              <div>
                <Typography sx={{ mb: 2, color: 'text.secondary' }}>{data2[0]?.adressTravaux}</Typography>
                <Typography sx={{ mb: 2, color: 'text.secondary' }}>{data2[0]?.villeTravaux}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{data2[0]?.codePostalTravaux}</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xl={6} xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <CustomTextField value={formateDate(new Date())} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-start'] }}>
            <div>
              <TableContainer>
                <Table>
                  <TableBody sx={{ '& .MuiTableCell-root': { py: `${theme.spacing(0.75)} !important` } }}>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary', mb: '1.5rem' }}>
                          <strong>ISOLATION ET RÉFÉRENCE :</strong> Laine de verre ISOVER TECH ROLL 3.0 -classé au feu
                          A1
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary', mb: '1.5rem' }}>
                          <strong>TEMPERATURE MAXIMALE:</strong> 300°c
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary', mb: '1.5rem' }}>
                          <strong>RÉFÉRENCE:</strong> ISOVAN
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>
                          <strong>MARQUE:</strong> MDI-TECHNOLOGIE
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-end'] }}>
            <div>
              <Typography variant='h6' sx={{ mb: 6 }}>
                RESISTANCE THERMIQUE (m3.K/W)
              </Typography>
              <TableContainer>
                <Table>
                  <TableRow>
                    <MUITableCell>
                      <Typography sx={{ color: 'text.secondary' }}>
                        : 1,50 m².K/W sur un réseau d'eau chaude ou de retour de condensats à température moyenne de
                        70°C
                      </Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography sx={{ color: 'text.secondary' }}>
                        : 1,33 m².K/W sur un réseau d'eau surchauffée à température moyenne de 90°C
                      </Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography sx={{ color: 'text.secondary' }}>
                        : 1,22 m².K/W sur un réseau vapeur à une température moyenne de 110°C
                      </Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography sx={{ color: 'text.secondary' }}>
                        : 1,18 m².K/W sur un réseau de fluide organique à une température moyenne de 120°C
                      </Typography>
                    </MUITableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />
      <Grid container>
        <Grid container sx={{ py: 4, px: 12, width: '100%', pr: { lg: 0, xs: 4 } }}>
          <Grid item lg={2.75} md={2.75} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography className='col-title' sx={{ mb: { xs: 0 }, color: 'text.secondary' }}>
              Zone d'implantation
            </Typography>
          </Grid>
          <Grid item lg={2.5} md={2.5} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
              Type de point <br />
              singulier
            </Typography>
          </Grid>
          <Grid item lg={2.5} md={2.5} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
              Réference matelas
            </Typography>
          </Grid>
          <Grid item lg={2} md={2} xs={1} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
              Fluide
            </Typography>
          </Grid>
          <Grid item lg={2} md={2} xs={2.75} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
              N° De repérage
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <List
        className='List'
        style={{
          border: 'none'
        }}
        height={500}
        width='100%'
        itemData={data}
        itemSize={() => 60}
        itemCount={data.length}
      >
        {Row}
      </List>

      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant='contained' onClick={() => handleAddNewItem()}>
            {data.length > 0 ? 'Changement de chaufferie' : 'Ajouter'}
          </Button>
          {data.length > 0 && (
            <Button variant='contained' onClick={() => handleAddNewLine()}>
              Ajouter un ligne
            </Button>
          )}
        </Grid>
      </Grid>
    </Card>
  )
}

export default AddCard
