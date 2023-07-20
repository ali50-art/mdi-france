// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Dashboard',
    path: '/admin-dashboard',
    action: 'read',
    subject: 'admin-dahsboard',
    icon: 'tabler:smart-home'
  },
  {
    path: '/instalateur-dahsboard',
    action: 'read',
    subject: 'instalateur-dahsboard',
    title: 'Dashboard',
    icon: 'tabler:smart-home'
  },
  {
    title: 'constructeur',
    path: '/constructeur',
    icon: 'tabler:truck'
  }
]

export default navigation
