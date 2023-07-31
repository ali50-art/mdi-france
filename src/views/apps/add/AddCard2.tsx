// ** React Imports
import { useState, useEffect, forwardRef, ForwardedRef } from 'react'

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
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import { styled, useTheme } from '@mui/material/styles'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

import MenuItem from '@mui/material/MenuItem'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Types

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'
import CustomTextField from 'src/@core/components/mui/text-field'
import { toast } from 'react-hot-toast'

interface PickerProps {
  label?: string
}

interface Props {
  toggleAddCustomerDrawer: () => void
  invoiceNumber: number
  clients: any[] | undefined
  selectedClient: any | null
  setSelectedClient: (val: any | null) => void
  handleSetCount: any
}

const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  return <CustomTextField fullWidth inputRef={ref} sx={{ width: { sm: '250px', xs: '170px' } }} {...props} />
})

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

const now = new Date()
const tomorrowDate = now.setDate(now.getDate() + 7)

const AddCard = (props: Props) => {
  // ** Props
  const { invoiceNumber, handleSetCount } = props

  // ** States
  const [count, setCount] = useState<number>(0)
  const [issueDate, setIssueDate] = useState<any>(new Date())
  const [dueDate, setDueDate] = useState<any>(new Date(tomorrowDate))
  const [data, setData] = useState<any[]>([])

  // ** Hook
  const theme = useTheme()

  // ** Deletes form

  const handleFetchData = async () => {
    try {
      const res = await getStoreData(Stores.PdfData2)
      console.log('res : ', res)

      setData([...res])
    } catch (err) {
      toast.error('opps !')
    }
  }

  const handleaddData = () => {
    let nb = 1
    if (localStorage.getItem('nb')) {
      nb = Number(localStorage.getItem('nb'))
    }

    return nb
  }
  const handleInitDB = async () => {
    await initDB()
  }
  const handleAddNewItem = async () => {
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
        type: 'Bride',
        red: 'ISOVANB1',

        rep: rep,
        nature: 'FLUID ORGANIQUE',
        categoryId: JSON.stringify(new Date()),
        saved: false
      }
      await addData(Stores.PdfData2, { ...data, id })
      localStorage.setItem('rep', '0')
      toast.success('vos avez ajoutez noveux ligine')
      setCount(count + 1)
    } catch (err: any) {
      toast.error('opps !')
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
  }
  const hnadlesetRef = async (id: any, d: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.red = d
    await updateDataById(Stores.PdfData2, id, { ...lastData })
    setCount(count + 1)
  }
  const handleChangeMood = async (id: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.saved = false
    await updateDataById(Stores.PdfData2, id, { ...lastData })
    setCount(count + 1)
  }

  const handleSetInput = async (id: any, d: any) => {
    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    lastData.local = d
    await updateDataById(Stores.PdfData2, id, { ...lastData })
    setCount(count + 1)
  }
  const handleAddNewLine = async () => {
    const id = Number(localStorage.getItem('lastId'))

    const index = data.findIndex((el: any) => el.id.toString() == id.toString())

    const lastData = data[index]
    try {
      lastData.rep += 1
      lastData.id += 1
      lastData.saved = false
      setCount(count + 1)
      await addData(Stores.PdfData2, { ...lastData })
      localStorage.setItem('lastId', JSON.stringify(id + 1))
    } catch (err) {
      toast.error('opps !')
    }
  }
  useEffect(() => {
    handleInitDB()
    handleFetchData()
  }, [, getStoreData, addData, count])

  return (
    <Card>
      <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
        <Grid container>
          <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ ml: 2.5, fontWeight: 700, lineHeight: '24px' }}>
                  {themeConfig.templateName}
                </Typography>
              </Box>
              <div>
                <Typography sx={{ mb: 2, color: 'text.secondary' }}>Office 149, 450 South Brand Brooklyn</Typography>
                <Typography sx={{ mb: 2, color: 'text.secondary' }}>San Diego County, CA 91905, USA</Typography>
                <Typography sx={{ color: 'text.secondary' }}>+1 (123) 456 7891, +44 (876) 543 2198</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xl={6} xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ mr: 2, width: '105px' }} onClick={handleaddData}>
                  Invoice
                </Typography>
                <CustomTextField
                  fullWidth
                  value={invoiceNumber}
                  sx={{ width: { sm: '250px', xs: '170px' } }}
                  InputProps={{
                    disabled: true,
                    startAdornment: <InputAdornment position='start'>#</InputAdornment>
                  }}
                />
              </Box>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>Date Issued:</Typography>
                <DatePicker
                  id='issue-date'
                  selected={issueDate}
                  customInput={<CustomInput />}
                  onChange={(date: Date) => setIssueDate(date)}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>Date Due:</Typography>
                <DatePicker
                  id='due-date'
                  selected={dueDate}
                  customInput={<CustomInput />}
                  onChange={(date: Date) => setDueDate(date)}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}></Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-end'] }}>
            <div>
              <Typography variant='h6' sx={{ mb: 6 }}>
                Bill To:
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody sx={{ '& .MuiTableCell-root': { py: `${theme.spacing(0.75)} !important` } }}>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>Total Due:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>$12,110.55</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>Bank name:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>American Bank</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>Country:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>United States</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>IBAN:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>ETD95476213874685</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>SWIFT code:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>BR91905</Typography>
                      </MUITableCell>
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
          <Grid item lg={2.75} md={2.75} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography className='col-title' sx={{ mb: { xs: 0 }, color: 'text.secondary' }}>
              Zon d'implantation
            </Typography>
          </Grid>
          <Grid item lg={2.5} md={2.5} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
              Type de point <br />
              singuiler
            </Typography>
          </Grid>
          <Grid item lg={2.5} md={2.5} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
              Réference metales
            </Typography>
          </Grid>
          <Grid item lg={2} md={2} xs={1} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
              N° repérage
            </Typography>
          </Grid>
          <Grid item lg={2} md={2} xs={2.75} sx={{ my: { lg: 0, xs: 4 } }}>
            <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
              Fluide
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
                      <Grid item lg={2.75} md={2.75} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                        <CustomTextField
                          placeholder="Zone d'implantation"
                          onChange={e => handleSetInput(data[i].id, e.target.value)}
                          defaultValue={data[i].local}
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                      </Grid>
                      <Grid item lg={2.75} md={2.75} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                        {data[i].saved ? (
                          <CustomTextField placeholder='1' value={data[i].dn} InputProps={{ inputProps: { min: 0 } }} />
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
                      <Grid item lg={2.75} md={2.75} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                        {data[i].saved ? (
                          <CustomTextField placeholder='1' value={data[i].dn} InputProps={{ inputProps: { min: 0 } }} />
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
                            <MenuItem value='ISOVANB1'>ISOVANB1</MenuItem>
                            <MenuItem value='ISOVANB2'>ISOVANB2</MenuItem>
                            <MenuItem value='ISOVANB3'>ISOVAN3</MenuItem>
                            <MenuItem value='ISOVANB4'>ISOVANB4</MenuItem>
                            <MenuItem value='ISOVANB5'>ISOVANB5</MenuItem>
                            <MenuItem value='ISOVANB6'>ISOVANB6</MenuItem>
                            <MenuItem value='ISOVANB7'>ISOVANB7</MenuItem>
                            <MenuItem value='ISOVANB8'>ISOVANB8</MenuItem>
                            <MenuItem value='ISOVANB9'>ISOVANB9</MenuItem>
                            <MenuItem value='ISOVANT0'>ISOVANT0</MenuItem>
                            <MenuItem value='ISOVANT1'>ISOVANT1</MenuItem>
                            <MenuItem value='ISOVANT2'>ISOVANT2</MenuItem>
                            <MenuItem value='ISOVANT3'>ISOVANT3</MenuItem>
                            <MenuItem value='ISOVANT4'>ISOVANT4</MenuItem>
                            <MenuItem value='ISOVANT5'>ISOVANT5</MenuItem>
                            <MenuItem value='ISOVANT6'>ISOVANT6</MenuItem>
                            <MenuItem value='ISOVANT7'>ISOVANT7</MenuItem>
                            <MenuItem value='ISOVANT8'>ISOVANT8</MenuItem>
                            <MenuItem value='ISOVANT9'>ISOVANT9</MenuItem>
                          </CustomTextField>
                        )}
                      </Grid>

                      <Grid item lg={1} md={1} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                        <CustomTextField placeholder='1' value={data[i].rep} InputProps={{ inputProps: { min: 0 } }} />
                      </Grid>

                      <Grid item lg={2.75} md={2.75} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                        <CustomTextField value='FUIDE ORGANIQUE' InputProps={{ inputProps: { min: 0 } }} />
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
              {data.length > 0 ? 'Changement de chaufferier' : 'Ajouter'}
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
