/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'instalateur') return '/constructeur'
  else if (role === 'logistique') return '/logistique/inProgress'
  else return '/admin-dashboard'
}

export default getHomeRoute
