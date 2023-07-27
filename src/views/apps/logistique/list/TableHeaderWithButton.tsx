// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Link from 'next/link'

interface TableHeaderProps {
  value: string
  url: string
  name?: string
  withName: boolean
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { toggle, url, name, withName } = props

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Button></Button>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link href={url}>
          <Button variant='outlined' sx={{ '& svg': { mr: 2 }, marginRight: '1.5rem' }}>
            <Icon fontSize='1.125rem' icon='tabler:arrow-big-left-lines-filled' />
            Retourner
          </Button>
        </Link>
        {withName && (
          <Button onClick={toggle} variant='contained' sx={{ '& svg': { mr: 2 } }}>
            <Icon fontSize='1.125rem' icon='tabler:plus' />
            {name}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default TableHeader
