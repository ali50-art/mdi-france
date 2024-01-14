// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Suivi des Chantier',
      path: '/suivi-chantier',
      action: 'read',
      subject: 'suivi-chantier',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Statistique',
      path: '/admin-statestique',
      action: 'manage',
      subject: 'admin-statestique',
      icon: 'tabler:chart-dots-2'
    },
    {
      sectionTitle: 'manipulation & configuration',
      action: 'magne',
      subject: 'users'
    },
    {
      title: 'Matériaux',
      path: '/material',
      action: 'mange',
      subject: 'material',
      icon: 'tabler:chart-pie-2'
    },
    {
      title: "Donneur D'ordre",
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
          action: 'manage',
          subject: 'logistique'
        },
        {
          title: 'Terminé',
          path: '/logistique/retour',
          action: 'manage',
          subject: 'logistique'
        }
      ]
    },
    {
      title: 'Logistique',
      action: 'manage',
      subject: 'logistique-admin',
      icon: 'tabler:truck',
      children: [
        {
          title: 'En cours',
          path: '/logistique-admin/inProgress',
          action: 'manage',
          subject: 'logistique-admin'
        },
        {
          title: 'Terminé',
          path: '/logistique-admin/retour',
          action: 'manage',
          subject: 'logistique-admin'
        }
      ]
    },
    {
      sectionTitle: 'interface construction',
      action: 'read',
      subject: 'installateur-dahsboard'
    },
    {
      title: 'installateur',
      action: 'read',
      subject: 'constructeur',
      icon: 'tabler:truck',
      children: [
        {
          title: 'construction',
          path: '/instalateur/constructeur',
          action: 'read',
          subject: 'constructeur'
        },
        {
          title: 'historique',
          path: '/instalateur/instalateur-history',
          action: 'read',
          subject: 'constructeur'
        }
      ]
    }
  ]
}

export default navigation
