// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
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
      sectionTitle: 'interface construction',
      action: 'read',
      subject: 'instalateur-dahsboard'
    },
    {
      title: 'constructeur',
      action: 'read',
      subject: 'constructeur',
      path: '/constructeur',
      icon: 'tabler:truck'
    }
  ]
}

export default navigation
