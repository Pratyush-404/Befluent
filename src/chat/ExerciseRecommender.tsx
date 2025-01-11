import { Messages } from './Chat'
import {
  IonButton,
  IonContent,
  IonPopover,
  IonProgressBar,
  useIonRouter,
} from '@ionic/react'
import { useExercises } from '../ExerciseContext'
import { useEffect, useState } from 'react'

export const ExerciseRecommender = ({ messages }: { messages: Messages }) => {
  const router = useIonRouter()
  const { setMessages } = useExercises()
  const [timer, setTimer] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const showOptionsAt = 5 * 60 // 5 minutes
  const showOptions = timer > showOptionsAt

  if (!showOptions)
    return (
      <>
        <div id="ex-rec-hover-trigger">
          Exercise Recommender Progress
          <IonProgressBar value={timer / showOptionsAt} />
        </div>
        <IonPopover trigger="ex-rec-hover-trigger" trigger-action="hover">
          <IonContent className="ion-padding">
            Exercises are recommended after 5 minutes of chat.
          </IonContent>
        </IonPopover>
      </>
    )
  else
    return (
      <>
        <IonButton
          onClick={() => {
            setTimer(0)
          }}
          style={{
            textTransform: 'none',
          }}
        >
          Continue Chat
        </IonButton>
        <IonButton
          onClick={() => {
            setMessages(messages)
            router.push('/exercises/rec')
          }}
          style={{
            textTransform: 'none',
          }}
        >
          Practice Exercises
        </IonButton>
      </>
    )
}
