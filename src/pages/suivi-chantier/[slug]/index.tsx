import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import AddActions from 'src/views/apps/suivierChantier/AddActions'
import AddCard from 'src/views/apps/suivierChantier/AddCard'

import AddCard2 from 'src/views/apps/suivierChantier/AddCard2'
import { useRouter } from 'next/router'

// ** Demo Components Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'src/store/apps/suiviChantierPdf'
import { fetchData as fetchData2 } from 'src/store/apps/material'

import { RootState, AppDispatch } from 'src/store'

const Constructeur = () => {
  const router = useRouter()
  const [id, setId] = useState(router.query.slug)
  const [count, setCount] = useState(0)
  const dispatch = useDispatch<AppDispatch>()

  const handleFetchId = () => {
    setId(router.query.slug)
  }

  const store: any = useSelector((state: RootState) => state.suiviChantierPdf)

  if (store.oneData > 0) {
    setCount(1)
  }
  useEffect(() => {
    dispatch(fetchData({ id: id }))
    dispatch(fetchData2({ pageSize: 50 }))
    handleFetchId()
  }, [dispatch, id, count])

  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={12} xs={12}>
          {store.data?.type === 'residentiel' ? <AddCard pdfId={id} /> : <AddCard2 pdfId={id} />}
        </Grid>
        <Grid item xl={3} md={12} xs={12}>
          <AddActions />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}
Constructeur.acl = {
  action: 'read',
  subject: 'suivi-chantier'
}

export default Constructeur
