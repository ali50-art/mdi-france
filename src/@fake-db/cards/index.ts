// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Type Imports
// import { CardStatsType } from 'src/@fake-db/types'

const cardStatsData: any = {
  statsHorizontalWithDetails: [
    {
      stats: '10',
      title: 'administrateur',
      icon: 'tabler:user-shield',
      subtitle: "total d'administrateurs"
    },
    {
      stats: '4',
      title: 'logistique',
      avatarColor: 'error',
      icon: 'tabler:truck',
      subtitle: "total d'logistiques"
    },
    {
      stats: '19',
      title: 'instalateur',
      avatarColor: 'success',
      icon: 'tabler:clipboard-data',
      subtitle: "total d'instalateurs"
    },
    {
      stats: '2',
      title: 'enseignant',
      avatarColor: 'warning',
      icon: 'tabler:report-search',
      subtitle: "total d'enseignants"
    }
  ]
}

mock.onGet('/cards/statistics').reply(() => {
  return [200, cardStatsData]
})
