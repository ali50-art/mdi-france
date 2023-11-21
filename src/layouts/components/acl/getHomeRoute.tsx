/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  console.log()

  if (role === 'instalateur') return '/instalateur/constructeur'
  else if (role === 'logisticien' || role === 'logistique') return '/logistique/inProgress'
  else return '/suivi-chantier'
}

export default getHomeRoute
