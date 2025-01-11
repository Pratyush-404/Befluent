import { IonContent, IonPage } from '@ionic/react'
import { ResultsPageData } from './chat/Chat'
import './Results.css'
import { Stats } from './Stats'
import { Link } from 'react-router-dom'
import { useExercises } from './ExerciseContext'

export const ResultsPage = () => {
  const { recs, recsDone } = useExercises()
  const data: ResultsPageData = JSON.parse(
    sessionStorage.getItem('results') || 'null'
  )
  const correctPercent = +(
    data.correct / (data.correct + data.incorrect || 1)
  ).toFixed(2)
  return (
    <IonPage>
      <IonContent className={'ion-padding'}>
        <h1>Results</h1>
        <h2 style={{ textAlign: 'center' }}>{data.exercise}</h2>
        <p style={{ textAlign: 'center' }}>Congrats!</p>
        <p style={{ textAlign: 'center' }}>
          You've completed your exercise set
        </p>
        <Stats {...data} correctPercent={correctPercent} />
        {recsDone.size === recs?.length ? (
          <Link to="/chat">Back to Chat!</Link>
        ) : (
          <Link to="/exercises/rec">Back to Exercises</Link>
        )}
      </IonContent>
    </IonPage>
  )
}
