// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { initDB, getStoreData, addData, updateDataById, Stores, deleteData } from '../../../lib/db'

import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Grid, { GridProps } from '@mui/material/Grid'

import TableContainer from '@mui/material/TableContainer'
import { styled, useTheme } from '@mui/material/styles'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import MenuItem from '@mui/material/MenuItem'

// ** Configs

// ** Types

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'
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

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  padding: theme.spacing(16, 10, 10),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(16)
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(10)
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6)
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
  const { handleSetCount, count2 } = props

  // ** States
  const [count, setCount] = useState<number>(0)

  const [data, setData] = useState<any[]>([])
  const [data2, setData2] = useState<any>([])
  const [materials, setMaterial] = useState<any>([])
  const [lastId, setlastId] = useState<any>(null)

  // ** Hook
  const theme = useTheme()

  // ** Deletes form

  const handleFetchData = async () => {
    try {
      const res: any = await getStoreData(Stores.PdfData)
      const res2 = await getStoreData(Stores.PdfInfo)
      if (res.length > 0) {
        setData([...res])
        setlastId(res[res.length - 1].id)
      } else {
        setlastId(0)
        setData([])
      }
      if (res2) {
        setData2([...res2])
      }
      handleMaterilas(res)
    } catch (err) {
      toast.error('opps !')
    }
  }

  const handleInitDB = async () => {
    await initDB()
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
        const data = {
          local: '',
          type: '',
          red: '',
          mass: '35mg/m3',
          rep: rep,
          dn: '',
          nature: 'Réseau Chaud',
          categoryId: JSON.stringify(new Date()),
          saved: false
        }
        await addData(Stores.PdfData, { ...data, id })
        localStorage.setItem('rep', '0')
        toast.success('vos avez ajoutez noveux ligine')
        setCount(count + 1)
        handleSetCount()
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
      updateDataById(Stores.PdfData, arr[i].id, { ...lastData })
    }
    const locaId = Number(localStorage.getItem('lastId'))
    if (locaId == id) {
      const newID = locaId - 1
      localStorage.setItem('lastId', JSON.stringify(newID))
    }
    await deleteData(Stores.PdfData, id)
    handleSetCount()
    setCount(count + 1)
  }
  const handleSaveItem = async (id: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.saved = true
    await updateDataById(Stores.PdfData, id, { ...lastData })
    setCount(count + 1)
    handleSetCount()
  }
  const handleSetFilter = async (id: any, d: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.type = d
    await updateDataById(Stores.PdfData, id, { ...lastData })
    setCount(count + 1)
  }
  const hnadlesetRef = async (id: any, d: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.red = d
    await updateDataById(Stores.PdfData, id, { ...lastData })
    setCount(count + 1)
    handleSetCount()
  }
  const handleChangeMood = async (id: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.saved = false
    await updateDataById(Stores.PdfData, id, { ...lastData })
    setCount(count + 1)
    handleSetCount()
  }
  const hnadlesetDn = async (id: any, d: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.dn = d
    await updateDataById(Stores.PdfData, id, { ...lastData })
    setCount(count + 1)
    handleSetCount()
  }
  const handleSetInput = async (id: any, d: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.local = d
    await updateDataById(Stores.PdfData, id, { ...lastData })
    setCount(count + 1)
    handleSetCount()
  }
  const handleAddNewLine = async () => {
    if (materials.length == 0) {
      toast.error('voter stock est terminer !')

      return
    } else {
      const id = Number(localStorage.getItem('lastId'))

      const index = data.findIndex((el: any) => el.id.toString() == id.toString())

      const lastData = data[index]

      if (lastData?.local == '' || lastData?.red == '' || lastData?.type == '' || lastData?.dn == '') {
        toast.error('completez le premier linge stp !')

        return
      }
      try {
        lastData.rep += 1
        lastData.id += 1
        lastData.type = ''
        lastData.red = ''
        lastData.dn = ''
        lastData.saved = false
        setCount(count + 1)
        await addData(Stores.PdfData, { ...lastData })
        localStorage.setItem('lastId', JSON.stringify(id + 1))
        handleSetCount()
      } catch (err) {
        toast.error('opps !')
      }
    }
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
  const countStock = (data: any, model: any) => {
    let nb = 0
    data.forEach((el: any) => {
      if (el.red == model) {
        nb += 1
      }
    })
    handleSetCount()

    return nb
  }
  ;('uuity')

  const handleMaterilas = (data: any) => {
    if (data.length == 0) {
      data = []
    }

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
  const ceckTheList = (arr: any, model: any) => {
    const index = arr.findIndex((el: any) => el.material.model == model)

    return index > -1
  }
  useEffect(() => {
    handleInitDB()
    handleFetchData()
  }, [, count2, getStoreData, addData, count, lastId, setMaterial])

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
                        <Typography sx={{ color: 'text.secondary' }}>
                          <strong>ISOLATION ET RÉFÉRENCE :</strong> Laine de verre ISOVER TECH ROLL 3.0 -classé au feu
                          A1
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>
                          <strong>TEMPERATURE MAXIMALE:</strong> 200°c
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>
                          <strong>RÉFÉRENCE:</strong> ISOVAN
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>
                          <strong>MARQUE:</strong> MDI-TECHNOLOGE
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
                  <TableBody sx={{ '& .MuiTableCell-root': { py: `${theme.spacing(0.75)} !important` } }}>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>
                          :1,58 m².K/W à une température moyenne de 50 °C
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <Typography sx={{ color: 'text.secondary' }}>
                        :1,27m2.K/W à une température moyenne de 100°C
                      </Typography>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />
      <Grid container>
        <Grid container sx={{ py: 4, px: 12, width: '100%', pr: { lg: 0, xs: 4 } }}>
          <Grid item lg={1.6} md={1.6} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography className='col-title' sx={{ mb: { xs: 0 }, color: 'text.secondary', textAlign: 'center' }}>
              Lieu
              <br /> d’implantation
            </Typography>
          </Grid>
          <Grid item lg={2} md={2} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography
              className='col-title'
              sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary', textAlign: 'center' }}
            >
              type <br />
              mode point singulier
            </Typography>
          </Grid>
          <Grid item lg={2} md={2} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography
              className='col-title'
              sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary', textAlign: 'center' }}
            >
              Référence matelas
            </Typography>
          </Grid>
          <Grid item lg={1.6} md={1.6} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography
              className='col-title'
              sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary', textAlign: 'center' }}
            >
              Masse <br />
              volumique
            </Typography>
          </Grid>
          <Grid item lg={1} md={1} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography
              className='col-title'
              sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary', textAlign: 'center' }}
            >
              N° De repérage
            </Typography>
          </Grid>
          <Grid item lg={1} md={1} xs={1} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography
              className='col-title'
              sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary', textAlign: 'center' }}
            >
              DN
            </Typography>
          </Grid>
          <Grid item lg={1.6} md={1.6} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography
              className='col-title'
              sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary', textAlign: 'center' }}
            >
              Nature du fluide caloporteur
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <RepeaterWrapper
        style={{
          paddingTop: '0'
        }}
      >
        <Repeater count={data.length}>
          {(i: number) => {
            const Tag = i === 0 ? Box : Collapse

            return (
              <Tag
                key={i}
                className='repeater-wrapper'
                {...(i !== 0 ? { in: true } : {})}
                style={{
                  marginTop: '0'
                }}
              >
                <Grid container>
                  <RepeatingContent item xs={12}>
                    <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                      <Grid item lg={2} md={2} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                        <CustomTextField
                          placeholder="Lieu d'implantation"
                          onChange={e => handleSetInput(data[i].id, e.target.value)}
                          defaultValue={data[i].local}
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                      </Grid>
                      <Grid item lg={2} md={2} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                        {data[i].saved ? (
                          <CustomTextField
                            placeholder='1'
                            value={data[i].type}
                            InputProps={{ inputProps: { min: 0 } }}
                          />
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
                            <MenuItem value='Bride'>Bride</MenuItem>
                            <MenuItem value='Vanne papillon'>Vanne papillon</MenuItem>
                            <MenuItem value='Robinet volant fileté'>Robinet volant fileté</MenuItem>
                            <MenuItem value="Manchette d'ecartement">Manchette d'ecartement</MenuItem>
                            <MenuItem value='Clapet fileté'>Clapet fileté</MenuItem>
                            <MenuItem value='Circulateur fileté'>Circulateur fileté</MenuItem>
                            <MenuItem value="Purgeur d'air fileté">Purgeur d'air fileté</MenuItem>
                            <MenuItem value="Purgeur d'eau fileté">Purgeur d'eau fileté</MenuItem>
                            <MenuItem value='Compteur'>Compteur</MenuItem>
                            <MenuItem value='Vanne volante bride'>Vanne volante bride</MenuItem>
                            <MenuItem value='Vanne TA'>Vanne TA</MenuItem>
                            <MenuItem value='EAP'>EAP</MenuItem>
                          </CustomTextField>
                        )}
                      </Grid>
                      <Grid item lg={2} md={2} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                        {data[i].saved ? (
                          <CustomTextField
                            placeholder='1'
                            value={data[i].red}
                            InputProps={{ inputProps: { min: 0 } }}
                          />
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

                      <Grid item lg={2} md={2} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                        <CustomTextField value='35mg/m3' InputProps={{ inputProps: { min: 0 } }} />
                      </Grid>
                      <Grid item lg={1} md={1} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                        <CustomTextField placeholder='1' value={data[i].rep} InputProps={{ inputProps: { min: 0 } }} />
                      </Grid>
                      <Grid item lg={1} md={1} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                        {data[i].saved ? (
                          <CustomTextField placeholder='1' value={data[i].dn} InputProps={{ inputProps: { min: 0 } }} />
                        ) : (
                          <CustomTextField
                            select
                            fullWidth
                            value={data[i].dn}
                            sx={{ mb: 4 }}
                            onChange={e => hnadlesetDn(data[i].id, e.target.value)}
                            SelectProps={{ value: data[i].dn, onChange: e => hnadlesetDn(data[i].id, e.target.value) }}
                          >
                            <MenuItem value='20'>20</MenuItem>
                            <MenuItem value='25'>25</MenuItem>
                            <MenuItem value='32'>32</MenuItem>
                            <MenuItem value='40'>40</MenuItem>
                            <MenuItem value='50'>50</MenuItem>
                            <MenuItem value='65'>65</MenuItem>
                            <MenuItem value='80'>80</MenuItem>
                            <MenuItem value='100'>100</MenuItem>
                            <MenuItem value='125'>125</MenuItem>
                            <MenuItem value='150'>150</MenuItem>
                            <MenuItem value='175'>175</MenuItem>
                            <MenuItem value='200'>200</MenuItem>
                            <MenuItem value='250'>250</MenuItem>
                          </CustomTextField>
                        )}
                      </Grid>
                      <Grid item lg={2} md={2} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                        <CustomTextField value='Réseau Chaud' InputProps={{ inputProps: { min: 0 } }} />
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
              </Tag>
            )
          }}
        </Repeater>

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
      </RepeaterWrapper>
    </Card>
  )
}

export default AddCard
