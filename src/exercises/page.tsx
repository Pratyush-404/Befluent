import { IonContent, IonItem, IonList, IonPage } from '@ionic/react'
import { useChatExercises } from '../ExerciseContext'
import { getChatExerciseLink } from '../chat/ChatPageOuter'
import { advancedExercises } from './advancedExercises'

export default function Page() {
  const chatExercises = useChatExercises()
  return (
    <IonPage>
      <IonContent className={'ion-padding'}>
        <h1>Exercises</h1>
        <h2>Chat Exercises</h2>
        <IonList style={{ height: '50vh', overflow: 'scroll' }}>
          {chatExercises?.map((exercise) => (
            <IonItem
              key={exercise.id}
              routerLink={getChatExerciseLink(exercise)}
            >
              {exercise.name}
            </IonItem>
          ))}
        </IonList>
        <h2>Advanced Exercises</h2>
        <IonList>
          {advancedExercises.map((exercise) => (
            <IonItem key={exercise} routerLink={'/exercise/' + exercise}>
              {exercise}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}
