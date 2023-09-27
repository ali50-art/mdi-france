// ** React Imports
import { useEffect } from 'react'

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
import Spinner from 'src/@core/components/spinner'
import TableContainer from '@mui/material/TableContainer'
import { styled, useTheme } from '@mui/material/styles'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import CardContent, { CardContentProps } from '@mui/material/CardContent'
import { useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/store'
import MenuItem from '@mui/material/MenuItem'
import { updatePdfDetails } from 'src/store/apps/suiviChantierPdf'

import { useSelector } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs

// ** Types

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'
import CustomTextField from 'src/@core/components/mui/text-field'
import { updatePdf } from 'src/store/apps/suiviChantierPdf'
import { useState } from 'react'

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

const AddCard = ({ pdfId }: any) => {
  // ** Props
  const [hasId, setHasId] = useState<any>([])
  const dispatch = useDispatch<AppDispatch>()
  const store: any = useSelector((state: RootState) => state.suiviChantierPdf)
  const data = store.data

  // ** Hook
  const theme = useTheme()

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
  const CheckExistingId = (id: any) => {
    const index = hasId.findIndex((el: any) => el.id.toString() == id.toString())

    return index == -1 ? false : true
  }
  const handleSetHasId = (id: any) => {
    if (hasId.length == 0) {
      return setHasId([{ id }])
    }
    setHasId([...hasId, { id }])
  }

  const handleUpdatePdf = (id: any) => {
    const index = hasId.findIndex((el: any) => el.id.toString() == id.toString())
    dispatch(updatePdfDetails({ data: hasId[index], pdfId: pdfId }))

    const newHaseId = hasId
    newHaseId.splice(index, 1)
    setHasId([...newHaseId])
  }
  const handlesetType = (e: any, id: any) => {
    const index = hasId.findIndex((el: any) => el.id.toString() == id.toString())
    const newHaseId = hasId
    newHaseId[index].filterType = e
    setHasId([...newHaseId])
  }
  const fetchType = (id: any) => {
    const index = hasId.findIndex((el: any) => el.id.toString() == id.toString())

    return hasId[index].filterType ? hasId[index].filterType : ''
  }
  const handlesetDn = (e: any, id: any) => {
    const index = hasId.findIndex((el: any) => el.id.toString() == id.toString())
    const newHaseId = hasId
    newHaseId[index].dn = e
    setHasId([...newHaseId])
  }
  const fetchDn = (id: any) => {
    const index = hasId.findIndex((el: any) => el.id.toString() == id.toString())

    return hasId[index].dn ? hasId[index].dn : ''
  }
  const handlesetModel = (e: any, id: any) => {
    const index = hasId.findIndex((el: any) => el.id.toString() == id.toString())
    const newHaseId = hasId
    newHaseId[index].model = e
    setHasId([...newHaseId])
  }
  const fetchModel = (id: any) => {
    const index = hasId.findIndex((el: any) => el.id.toString() == id.toString())

    return hasId[index].model ? hasId[index].model : ''
  }
  const storeMaterial: any = useSelector((state: RootState) => state.material)
  useEffect(() => {
    console.log()
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
                    <Typography sx={{ mb: 2, color: 'text.secondary' }}>{data?.clientName}</Typography>
                    <Typography sx={{ mb: 2, color: 'text.secondary' }}>{data?.clientAdress}</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data?.clientVille}</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data?.clientCodePostal}</Typography>
                  </>
                )}
              </div>
            </Box>
          </Grid>
          <Grid item xl={6} xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <CustomTextField value={formateDate(data?.createdAt)} />
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
                          <strong>TEMPERATURE MAXIMALE:</strong> 250°c
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography sx={{ color: 'text.secondary' }}>
                          <strong>RÉFÉRENCE:</strong> Matelas
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
                        :1,27 m².K/W à une température moyenne de 100°C
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
              <Grid item lg={1.6} md={1.6} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
                <Typography className='col-title' sx={{ mb: { xs: 0 }, color: 'text.secondary', textAlign: 'center' }}>
                  Lieu
                  <br /> d'implantation
                </Typography>
              </Grid>
              <Grid item lg={2} md={2} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
                <Typography
                  className='col-title'
                  sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary', textAlign: 'center' }}
                >
                  Type de point <br />
                  singulier
                </Typography>
              </Grid>
              <Grid item lg={2} md={2} xs={1.5} sx={{ my: { lg: 0, xs: 4 } }}>
                <Typography
                  className='col-title'
                  sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary', textAlign: 'center' }}
                >
                  Référence metelas
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
                  N° repérage
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
            <Repeater count={data?.pdefDetails?.length}>
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
                              defaultValue={data.pdefDetails[i].place}
                              InputProps={{ inputProps: { min: 0 } }}
                            />
                          </Grid>
                          <Grid item lg={2} md={2} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                            {CheckExistingId(data.pdefDetails[i]?._id) == false ? (
                              <CustomTextField
                                value={data.pdefDetails[i].filterType}
                                InputProps={{ inputProps: { min: 0 } }}
                              />
                            ) : (
                              <CustomTextField
                                select
                                fullWidth
                                value={fetchType(data?.pdefDetails[i]?._id)}
                                sx={{ mb: 4 }}
                                onChange={e => handlesetType(e.target.value, data?.pdefDetails[i]?._id)}
                                SelectProps={{
                                  value: fetchType(data?.pdefDetails[i]?._id),
                                  onChange: e => handlesetType(e.target.value, data?.pdefDetails[i]?._id)
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
                            {CheckExistingId(data?.pdefDetails[i]?._id) == true ? (
                              <CustomTextField
                                select
                                fullWidth
                                value={fetchModel(store?.data?.pdefDetails[i]?._id)}
                                sx={{ mb: 4 }}
                                onChange={e => handlesetModel(e.target.value, store?.data?.pdefDetails[i]?._id)}
                                SelectProps={{
                                  value: fetchModel(store?.data?.pdefDetails[i]?._id),
                                  onChange: e => handlesetModel(e.target.value, store?.data?.pdefDetails[i]?._id)
                                }}
                              >
                                {storeMaterial.data.map((ele: any) => {
                                  return (
                                    <MenuItem value={ele.model} key={i}>
                                      {ele.model}
                                    </MenuItem>
                                  )
                                })}
                              </CustomTextField>
                            ) : (
                              <CustomTextField
                                placeholder=''
                                value={store?.data?.pdefDetails[i].model}
                                InputProps={{ inputProps: { min: 0 } }}
                              />
                            )}
                          </Grid>

                          <Grid item lg={2} md={2} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                            <CustomTextField value='35mg/m3' InputProps={{ inputProps: { min: 0 } }} />
                          </Grid>
                          <Grid item lg={1} md={1} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                            <CustomTextField
                              placeholder='1'
                              value={data.pdefDetails[i].nbRep}
                              InputProps={{ inputProps: { min: 0 } }}
                            />
                          </Grid>
                          <Grid item lg={1} md={1} xs={12} sx={{ px: 1, my: { lg: 0, xs: 4 } }}>
                            {CheckExistingId(data.pdefDetails[i]?._id) == false ? (
                              <CustomTextField
                                placeholder='1'
                                value={data.pdefDetails[i].dn}
                                InputProps={{ inputProps: { min: 0 } }}
                              />
                            ) : (
                              <CustomTextField
                                select
                                fullWidth
                                value={fetchDn(data?.pdefDetails[i]?._id)}
                                sx={{ mb: 4 }}
                                onChange={e => handlesetDn(e.target.value, data?.pdefDetails[i]?._id)}
                                SelectProps={{
                                  value: fetchDn(data?.pdefDetails[i]?._id),
                                  onChange: e => handlesetDn(e.target.value, data?.pdefDetails[i]?._id)
                                }}
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
                          <IconButton size='small' onClick={() => handleDeleteItem(data.pdefDetails[i]._id)}>
                            <Icon icon='tabler:x' fontSize='1.25rem' />
                          </IconButton>
                          <Divider />
                          {CheckExistingId(data?.pdefDetails[i]?._id) == true ? (
                            <IconButton size='small'>
                              <Icon
                                icon='tabler:check'
                                fontSize='1.25rem'
                                onClick={() => handleUpdatePdf(data?.pdefDetails[i]?._id)}
                              />
                            </IconButton>
                          ) : (
                            <IconButton size='small'>
                              <Icon
                                icon='tabler:edit'
                                fontSize='1.25rem'
                                onClick={() => handleSetHasId(data?.pdefDetails[i]?._id)}
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
