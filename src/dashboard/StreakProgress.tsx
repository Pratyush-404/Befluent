import { useUserContext } from '../UserContext'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { supa } from '../../supabase'

export const StreakProgress = () => {
  const { user } = useUserContext()
  const [days, setDays] = useState<{ dow: string; loggedIn: boolean }[]>([])
  //check for logins in the past 7 days
  useEffect(() => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    supa
      .from('logins')
      .select('date')
      .eq('user_id', user.id)
      .gte('date', sevenDaysAgo.toISOString())
      .then((res) => {
        if (!res.data) return
        const logins = new Set(
          res.data.map((login) =>
            new Date(login.date).toLocaleDateString('en-US', {
              weekday: 'short',
            })
          )
        )
        const next: { dow: string; loggedIn: boolean }[] = Array(7)
        for (let i = 0; i < 7; i++) {
          const day = new Date()
          day.setDate(day.getDate() - i)
          next[i] = { dow: '', loggedIn: false }
          next[i].dow = day.toLocaleDateString('en-US', { weekday: 'short' })
          next[i].loggedIn = logins.has(next[i].dow)
        }
        setDays(next.reverse())
      })
  }, [])
  return (
    <>
      <h2>Streak Progress</h2>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {days.map((login, i) => (
          <span
            key={i}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: login.loggedIn
                ? 'var(--ion-color-warning)'
                : 'var(--ion-color-secondary)',
            }}
          >
            {login.dow}
            {!login.loggedIn && (
              <span
                style={{
                  color: 'red',
                  fontSize: 40,
                  position: 'absolute',
                }}
              >
                X
              </span>
            )}
          </span>
        ))}
      </div>
    </>
  )
}
