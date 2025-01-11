import { useEffect } from 'react'
import { supa } from '../supabase'
import { AuthUser } from '@supabase/supabase-js'

export const useLoginTracker = (authUser: AuthUser | null | undefined) => {
  useEffect(() => {
    const f = async () => {
      // Store the current timestamp in the database
      if (!authUser) return

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      const { data: logins, error } = await supa
        .from('logins')
        .select('date')
        .eq('user_id', authUser.id)
        .gte('date', today.toISOString())
        .lt('date', tomorrow.toISOString())

      if (error) {
        console.error(error)
        return
      }

      if (logins && logins.length === 0) {
        await supa.from('logins').insert({}).then()
      }
    }
    f()
  }, [authUser])
}
