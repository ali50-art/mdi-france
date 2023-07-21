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
      sectionTitle: 'manipulation',
      action: 'magne',
      subject: 'users'
    },
    {
      title: 'staff',
      path: '/users',
      action: 'mange',
      subject: 'users',
      icon: 'tabler:users'
    },
    {
      title: 'logistique',
      path: '/admin-logistique',
      action: 'mange',
      subject: 'admin-logistique',
      icon: 'tabler:truck'
    },
    {
      title: 'instalateurs',
      path: '/admin-instalateur',
      action: 'mange',
      subject: 'admin-instalateur',
      icon: 'tabler:clock'
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
