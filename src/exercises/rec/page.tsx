import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { Icon } from '@iconify/react'
import books from './books.png'
import { Link } from 'react-router-dom'
import { colors, ExerciseTemplateName, icons } from './exerciseTemplates'
import { useExercises } from '../../ExerciseContext'
import { LoadingPage } from '../../loading-page'
import { getChatExerciseLink } from '../../chat/ChatPageOuter'

const Page = () => {
  const { recs, recsDone, setRecsDone } = useExercises()

  if (recs === undefined) return <LoadingPage />
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle size={'large'}>
            <h2>Let's Practice Together!</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={'ion-padding'}>
        <IonText color={'primary'}>
          <h3>Recommended</h3>
        </IonText>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            height: '70vh',
            color: 'white',
            columnGap: 28,
            rowGap: 21,
          }}
        >
          {recs?.map((exercise, index) => {
            const exerciseName = exercise.name as ExerciseTemplateName
            let exerciseColors = colors[exerciseName] as
              | [string, string]
              | undefined
            if (!exerciseColors) {
              exerciseColors =
                Object.values(colors)[
                  Math.floor(Math.random() * Object.keys(colors).length)
                ]
            }
            const [bg0, bg1] = exerciseColors
            const isFirst = index === 0
            const gridStyle = isFirst ? { gridRow: 'span 2' } : {}
            const done = recsDone.has(exercise.name)
            return (
              <Link
                key={exercise.type + exercise.name}
                style={{
                  ...gridStyle,
                  background: `linear-gradient(270deg, ${bg0} 0%, ${bg1} 100%)`,
                  padding: '15px 10px',
                  borderRadius: 10,
                  position: 'relative',
                  color: 'white',
                  textDecoration: 'none',
                  pointerEvents: done ? 'none' : 'auto',
                  opacity: done ? 0.2 : 1,
                }}
                to={
                  exercise.type === 'chat'
                    ? getChatExerciseLink(exercise)
                    : '/exercise/' + exercise.name
                }
                onClick={() => {
                  const nextRecsDone = new Set(recsDone)
                  nextRecsDone.add(exercise.name)
                  setRecsDone(nextRecsDone)
                }}
              >
                <Icon
                  icon={icons[exerciseName]}
                  style={{ display: 'block' }}
                  height={50}
                />
                <h4>{exercise.name}</h4>
                {isFirst && (
                  <img
                    src={books}
                    alt="books"
                    style={{
                      position: 'absolute',
                      left: 0,
                      width: '90%',
                      bottom: 20,
                    }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </IonContent>
    </IonPage>
  )
}
export default Page
// const advancedExercisesWithTypes = advancedExercises.map((e) => ({
//   name: e,
//   type: 'advanced',
// }))
