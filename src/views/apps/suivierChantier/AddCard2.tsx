// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'

import Divider from '@mui/material/Divider'

import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Grid, { GridProps } from '@mui/material/Grid'

import TableContainer from '@mui/material/TableContainer'
import MenuItem from '@mui/material/MenuItem'
import { styled, useTheme } from '@mui/material/styles'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types

import { useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/store'
import { useSelector } from 'react-redux'
import { fetchData } from 'src/store/apps/material'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'
import CustomTextField from 'src/@core/components/mui/text-field'
import { updatePdf } from 'src/store/apps/suiviChantierPdf'
import Spinner from 'src/@core/components/spinner'

// import { toast } from 'react-hot-toast'

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

const AddCard = () => {
  // ** Props
  const dispatch = useDispatch<AppDispatch>()
  const store: any = useSelector((state: RootState) => state.suiviChantierPdf)

  // ** States
  const [hasId, setHasId] = useState<any>([])
  const [materail, setMaterail] = useState<any>('')

  // ** Hook
  const theme = useTheme()

  const CheckExistingId = (id: any) => {
    const index = hasId.findIndex((el: any) => el.toString() == id.toString())
    console.log('index : ', index)

    return index == -1 ? false : true
  }
  const handleSetHasId = (id: any) => {
    if (hasId.length == 0) {
      return setHasId([id])
    }
    setHasId([...hasId, id])
  }

  // ** Deletes form

  const handleDeleteItem = async (id: any) => {
    dispatch(updatePdf({ pdfId: store.data._id, pdfDetailsId: id }))
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
  const storeMaterial: any = useSelector((state: RootState) => state.material)
  useEffect(() => {
    fetchData({
      pageSize: 50
    })
  }, [hasId])

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
                {store?.data?.orderDetailId ? (
                  <>
                    <Typography sx={{ mb: 2, color: 'text.secondary' }}>{store?.data?.orderDetailId?.name}</Typography>
                    <Typography sx={{ mb: 2, color: 'text.secondary' }}>
                      {store?.data?.orderDetailId?.address}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{store?.data?.orderDetailId?.ville}</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{store?.data?.orderDetailId?.codePost}</Typography>
                  </>
                ) : (
                  <>
                    <Typography sx={{ mb: 2, color: 'text.secondary' }}>{store?.data?.clientName}</Typography>
                    <Typography sx={{ mb: 2, color: 'text.secondary' }}>{store?.data?.clientAdress}</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{store?.data?.clientVille}</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{store?.data?.clientCodePostal}</Typography>
                  </>
                )}
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
                          <strong>ISOLATION ET REFERANCE :</strong> Laine de verre ISOVER TECH ROLL 3.0 -classé au feu
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
                          <strong>REFERANCE:</strong> ISOVAN
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
                          :1,58 m².K/W a une tempurature moyenne de 50 °C
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <Typography sx={{ color: 'text.secondary' }}>
                        :1,58 m².K/W a une tempurature moyenne de 100 °C
                      </Typography>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </CardContent>

      {store.isLoading == true ? (
        <Box>
          <Spinner />
        </Box>
      ) : (
        <>
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
            <Repeater count={store?.data?.pdefDetails?.length}>
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
                              defaultValue={store?.data?.pdefDetails[i].place}
                              InputProps={{ inputProps: { min: 0 } }}
                            />
                          </Grid>
                          <Grid item lg={2.75} md={2.75} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                            <CustomTextField
                              value={store?.data?.pdefDetails[i].filterType}
                              InputProps={{ inputProps: { min: 0 } }}
                            />
                          </Grid>
                          <Grid item lg={2.75} md={2.75} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                            {CheckExistingId(store?.data?.pdefDetails[i]?._id) == true ? (
                              <CustomTextField
                                select
                                fullWidth
                                value={materail}
                                sx={{ mb: 4 }}
                                onChange={e => setMaterail(e.target.value)}
                                SelectProps={{
                                  value: materail,
                                  onChange: e => setMaterail(e.target.value)
                                }}
                              >
                                {storeMaterial.data.map((ele: any) => {
                                  return (
                                    <MenuItem value={ele.red} key={i}>
                                      ISOVAN{ele.red}
                                    </MenuItem>
                                  )
                                })}
                              </CustomTextField>
                            ) : (
                              <CustomTextField
                                placeholder='1'
                                value={store?.data?.pdefDetails[i].model}
                                InputProps={{ inputProps: { min: 0 } }}
                              />
                            )}
                          </Grid>

                          <Grid item lg={1} md={1} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                            <CustomTextField
                              value={store?.data?.pdefDetails[i].nbRep}
                              InputProps={{ inputProps: { min: 0 } }}
                            />
                          </Grid>

                          <Grid item lg={2.75} md={2.75} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                            <CustomTextField value='FUIDE ORGANIQUE' InputProps={{ inputProps: { min: 0 } }} />
                          </Grid>
                        </Grid>
                        <InvoiceAction>
                          <IconButton size='small' onClick={() => handleDeleteItem(store?.data?.pdefDetails[i]._id)}>
                            <Icon icon='tabler:x' fontSize='1.25rem' />
                          </IconButton>
                          <Divider />
                          {CheckExistingId(store?.data?.pdefDetails[i]?._id) == true ? (
                            <IconButton size='small'>
                              <Icon icon='tabler:check' fontSize='1.25rem' />
                            </IconButton>
                          ) : (
                            <IconButton size='small'>
                              <Icon
                                icon='tabler:edit'
                                fontSize='1.25rem'
                                onClick={() => handleSetHasId(store?.data?.pdefDetails[i]?._id)}
                              />
                            </IconButton>
                          )}
                        </InvoiceAction>
                      </RepeatingContent>
                    </Grid>
                  </Tag>
                )
              }}
            </Repeater>
          </RepeaterWrapper>
        </>
      )}
    </Card>
  )
}

export default AddCard
