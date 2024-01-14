import { Grid } from '@mui/material'

// import Image from 'next/image'

const AdminStat = () => {
  return (
    <Grid container spacing={6.5}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <img
          src='/images/inWork.jpg'
          alt=''
          style={{
            width: '50%'
          }}
        />
      </div>
    </Grid>
  )
}

AdminStat.acl = {
  action: 'manage',
  subject: 'admin-statestique'
}
export default AdminStat
