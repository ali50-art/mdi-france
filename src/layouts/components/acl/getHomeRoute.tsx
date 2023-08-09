/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'instalateur') return '/constructeur'
  else if (role === 'logisticien') return '/logistique/inProgress'
  else return '/suivi-chantier'
}

export default getHomeRoute
