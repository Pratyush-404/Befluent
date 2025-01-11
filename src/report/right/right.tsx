import { supa } from '../../../supabase'
import { useEffect, useState } from 'react'
import { AuthUser } from '@supabase/supabase-js'
import { Link } from 'react-router-dom'
import { User } from '../../UserContext'
import { IonSpinner } from '@ionic/react'
import { Streaks } from './streaks'
import { Exercises } from './exercises'
import { ChatExercises } from '../../../chrome-ext/content'
import { AdvancedExerciseName } from '../../exercises/advancedExercises'

export const Right = ({
  chatExercises,
  advancedExercises,
}: {
  chatExercises: ChatExercises
  advancedExercises: AdvancedExerciseName[]
}) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>()
  useEffect(() => {
    const f = async () => {
      const authUser = await supa.auth.getUser()
      setAuthUser(authUser.data.user)
    }
    f()
  }, [])

  const [user, setUser] = useState<Pick<User, 'full_name'> | null>()
  useEffect(() => {
    if (!authUser) return
    const f = async () => {
      const { data } = await supa
        .from('users')
        .select('full_name')
        .eq('id', authUser?.id)
        .single()
      setUser(data)
    }
    f()
  }, [authUser])

  return (
    <div
      style={{ background: 'white', width: '24%', overflow: 'auto' }}
      className={'ion-padding'}
    >
      {authUser === undefined ? (
        <IonSpinner />
      ) : authUser === null ? (
        <>
          <Link to={'/'} style={{ marginRight: 4 }}>
            Sign in
          </Link>
          to track your progress
        </>
      ) : (
        <>
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {user?.full_name}
          </div>
          <div
            style={{
              color: 'var(--ion-color-primary)',
            }}
          >
            {authUser.email}
          </div>
        </>
      )}
      {authUser && <Streaks authUser={authUser} />}
      <Exercises
        chatExercises={chatExercises}
        advancedExercises={advancedExercises}
      />
    </div>
  )
}
