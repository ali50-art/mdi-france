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
      sectionTitle: 'manipulation & configuration',
      action: 'magne',
      subject: 'users'
    },
    {
      title: 'Materiel',
      path: '/material',
      action: 'mange',
      subject: 'material',
      icon: 'tabler:chart-pie-2'
    },
    {
      title: "Donner D'order",
      path: '/orderDetails',
      action: 'mange',
      subject: 'orderDetails',
      icon: 'tabler:shopping-cart'
    },
    {
      title: 'Staff',
      path: '/users',
      action: 'mange',
      subject: 'users',
      icon: 'tabler:users'
    },
    {
      sectionTitle: 'traviler',
      action: 'magne',
      subject: 'admin-logistique'
    },
    {
      title: 'Logistique',
      action: 'mange',
      subject: 'admin-logistique',
      icon: 'tabler:truck',
      children: [
        {
          title: 'En cours',
          path: '/admin-logistique/inprogress',
          action: 'mange',
          subject: 'admin-logistique'
        },
        {
          title: 'Terminé',
          path: '/admin-logistique/retour',
          action: 'mange',
          subject: 'admin-logistique'
        }
      ]
    },
    {
      title: 'Logistique',
      action: 'mange',
      subject: 'logistique',
      icon: 'tabler:truck',
      children: [
        {
          title: 'En cours',
          path: '/logistique/inProgress',
          action: 'mange',
          subject: 'logistique'
        },
        {
          title: 'Terminé',
          path: '/logistique/retour',
          action: 'mange',
          subject: 'logistique'
        }
      ]
    },
    {
      title: 'instalateurs',
      path: '/admin-instalateur',
      action: 'mange',
      subject: 'admin-instalateur',
      icon: 'tabler:clock'
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
