// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Suivi  Chantier',
      path: '/suivi-chantier',
      action: 'read',
      subject: 'suivi-chantier',
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
