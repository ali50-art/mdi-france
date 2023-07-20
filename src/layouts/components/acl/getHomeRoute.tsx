/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'instalateur') return '/instalateur-dahsboard'
  else return '/admin-dashboard'
}

export default getHomeRoute
