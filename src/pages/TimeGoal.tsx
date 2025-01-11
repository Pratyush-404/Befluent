import { Database } from '../../types_db'
import { IonButton } from '@ionic/react'
import { useContext } from 'react'
import { UserContext } from '../UserContext'

export default function TimeGoal({ next }: { next?: () => void }) {
  const { user, setUser } = useContext(UserContext)
  return (
    <div className={'ion-text-center'}>
      <h1>Time Goal</h1>
      <h2>How much time are you willing to give on a daily basis?</h2>
      <div>
        {timeGoals.map((goal) => (
          <IonButton
            key={goal}
            onClick={async () => {
              setUser({ ...user, time_goal: goal })
              next?.()
            }}
          >
            {user?.time_goal === goal ? '✅ ' : ''}
            {goal}
          </IonButton>
        ))}{' '}
        minutes
      </div>
    </div>
  )
}
const timeGoals: Database['public']['Enums']['time_goal'][] = ['20', '40', '60']
