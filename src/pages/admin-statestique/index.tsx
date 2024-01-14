import { Grid } from '@mui/material'

// import Image from 'next/image'

const AdminStat = () => {
  return (
    <Grid container spacing={6.5}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20rem' }}>
        <img src='/images/inWork.jpg' alt='' />
      </div>
    </Grid>
  )
}

AdminStat.acl = {
  action: 'manage',
  subject: 'admin-statestique'
}
export default AdminStat
