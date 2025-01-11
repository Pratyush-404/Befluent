import { useEffect, useState } from 'react'
import { AuthUser } from '@supabase/supabase-js'
import { supa } from '../../../supabase'

export const Streaks = ({ authUser }: { authUser: AuthUser }) => {
  const [loginsThisMonth, setLoginsThisMonth] = useState<number>()
  const [loginsAllTime, setLoginsAllTime] = useState<number>()

  useEffect(() => {
    const f = async () => {
      const [rThisMonth, rAllTime] = await Promise.all([
        supa
          .from('logins')
          .select('*', { count: 'exact', head: true })
          .gte(
            'date',
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              1
            ).toISOString()
          ),
        supa.from('logins').select('*', { count: 'exact', head: true }),
      ])

      if (rThisMonth.count) setLoginsThisMonth(rThisMonth.count)
      if (rAllTime.count) setLoginsAllTime(rAllTime.count)
    }
    f()
  }, [authUser])

  return (
    <div
      style={{
        marginTop: 40,
      }}
    >
      <h3>Streak Progress</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          days={loginsThisMonth}
          label={'This Month'}
          background={
            'linear-gradient(rgba(0, 138, 187, 1),rgba(149, 202, 220, 1))'
          }
        />
        <Box
          days={loginsAllTime}
          label={'Total'}
          background={
            'linear-gradient(rgba(193, 88, 189, 1),rgba(204, 143, 237, 1))'
          }
        />
      </div>
    </div>
  )
}
const Box = ({
  days,
  label,
  background,
}: {
  days: number | undefined
  label: string
  background: string
}) => (
  <div
    style={{
      background,
      color: 'white',
      width: '45%',
      height: 112,
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: 14,
      borderRadius: 12,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          fontWeight: 900,
          fontSize: 28,
          marginRight: 2,
        }}
      >
        {days}
      </span>
      <span
        style={{
          fontSize: 12,
        }}
      >
        days
      </span>
    </div>
    <div
      style={{
        fontWeight: 600,
      }}
    >
      Here
    </div>
    <div
      style={{
        fontSize: 12,
        color: 'rgba(19, 19, 19, 0.55)',
      }}
    >
      {label}
    </div>
  </div>
)
