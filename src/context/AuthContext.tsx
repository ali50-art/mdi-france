// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { serverUri } from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [online, setIsOnline] = useState<any>(false)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      if (storedToken && online == true) {
        setLoading(true)
        await axios
          .get(`${serverUri.uri}/api/profile`, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async (response: any) => {
            setLoading(false)

            if (response.data.data?.role == 'instalateur') {
              const sortedData = response.data.data.charge.materials.sort()
              localStorage.setItem('userData', JSON.stringify(sortedData))
              setUser({ ...sortedData })
            } else {
              localStorage.setItem('userData', JSON.stringify(response.data.data))
              setUser({ ...response.data.data })
            }
          })
          .catch(() => {
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            setUser(null)
            setLoading(false)

            router.replace('/login')
          })
      } else if (storedToken && online == false) {
        const x: any = localStorage.getItem('userData')
        setUser(JSON.parse(x))
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
    function handleOnlineStatusChange() {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener('online', handleOnlineStatusChange)
    window.addEventListener('offline', handleOnlineStatusChange)
    handleOnlineStatusChange()
    initAuth()

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange)
      window.removeEventListener('offline', handleOnlineStatusChange)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(`${serverUri.uri}/api/login`, params)
      .then(async response => {
        params.rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.data.token) : null
        const returnUrl = router.query.returnUrl

        setUser({ ...response.data.data.user })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.data.user)) : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
