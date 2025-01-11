import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { useAuthUserObject } from '../AuthUserProvider'
import { supa } from '../../supabase'
import { LoadingPage } from '../loading-page'

type State = undefined | 'none' | 'inactive' | 'active'
const Context = createContext<{
  state: State
  checkSub(): void
  isActive: boolean
}>(undefined as never)
export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { authUser } = useAuthUserObject()
  const [state, setState] = useState<State>()
  const checkSub = async () => {
    setState(undefined)
    const res = await supa.functions.invoke(
      `subscription?email=${authUser.email}`
    )
    setState(res.data)
  }
  useEffect(() => {
    checkSub()
  }, [authUser.email])
  if (state === undefined) return <LoadingPage />
  return (
    <Context.Provider value={{ state, checkSub, isActive: state === 'active' }}>
      {children}
    </Context.Provider>
  )
}
export const useSubscription = () => {
  const context = React.useContext(Context)
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionContext')
  }
  return context
}
export const useSubscriptionInactive = () => {
  const { isActive } = useSubscription()
  return !isActive
}
