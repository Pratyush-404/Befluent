import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Database } from '../types_db'
import { supa } from '../supabase'
import { useIonRouter } from '@ionic/react'
import { LoadingPage } from './loading-page'

export type User = Database['public']['Tables']['users']['Row']
export const UserContext = createContext<{
  user: User
  setUser: Dispatch<SetStateAction<User | undefined>>
  isAdmin: boolean
}>(undefined as never)

export const UserProvider = (props: PropsWithChildren) => {
  const [state, setState] = useState<User>()
  const router = useIonRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    const f = async () => {
      const r = await supa.from('users').select().single()
      if (!r.data) return
      setState(r.data)
      if (!r.data.full_name) router.push('/onboarding')
      const r0 = await supa.from('admins').select()
      const isAdmin = !!r0.data?.length
      setIsAdmin(isAdmin)
    }
    f()
  }, [])
  useEffect(() => {
    if (!state) return
    const f = async () => {
      await supa.from('users').update(state).eq('id', state.id)
    }
    f()
  }, [state])
  if (state === undefined) return <LoadingPage />
  return (
    <UserContext.Provider
      value={{
        user: state,
        setUser: setState,
        isAdmin,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
export const useUserContext = () => {
  return useContext(UserContext)
}
export const useUser = () => {
  return useUserContext().user
}
