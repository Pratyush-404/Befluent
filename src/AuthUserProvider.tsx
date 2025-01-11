import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { supa } from '../supabase'
import AuthPage from './pages/AuthPage'
import { useIonRouter } from '@ionic/react'
import posthog from 'posthog-js'
import { useLoginTracker } from './UseLoginTracker'
import { Tabs } from './tabs/Tabs'
import { LoadingPage } from './loading-page'
import { AuthUser } from '@supabase/supabase-js'

type SupabaseContext = {
  authUser: AuthUser
}

const Context = createContext<SupabaseContext>(undefined as never)

export default function AuthUserProvider({
  children,
}: {
  children: ReactNode
}) {
  const [authUser, setAuthUser] = useState<AuthUser | null | undefined>(
    undefined
  )
  const router = useIonRouter()
  useEffect(() => {
    const {
      data: { subscription },
    } = supa.auth.onAuthStateChange(async (event, session) => {
      setAuthUser(session?.user || null)
      if (event == 'PASSWORD_RECOVERY') {
        router.push('/auth/change-password')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])
  useLoginTracker(authUser)
  useEffect(() => {
    if (!authUser) return posthog.reset()
    posthog.identify(authUser?.id, { email: authUser?.email })
  }, [authUser])
  if (authUser === undefined) return <LoadingPage />
  if (authUser === null) return <AuthPage />
  else
    return (
      <Context.Provider value={{ authUser: authUser }}>
        <Tabs>{children}</Tabs>
      </Context.Provider>
    )
}
//deprecated
export const useAuthUserObject = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useAuthUser must be used inside SupabaseProvider')
  }

  return context
}

export const useAuthUser = () => {
  const context = useContext(Context)

  return context.authUser
}
