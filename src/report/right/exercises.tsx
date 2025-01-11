import { IonButton, IonIcon } from '@ionic/react'
import { Link } from 'react-router-dom'
import { getChatExerciseLink } from '../../chat/ChatPageOuter'
import { caretForward } from 'ionicons/icons'
import {
  advancedExerciseDescriptions,
  AdvancedExerciseName,
} from '../../exercises/advancedExercises'
import { ChatExercises } from '../../../chrome-ext/content'

export const Exercises = ({
  chatExercises,
  advancedExercises,
}: {
  chatExercises: ChatExercises
  advancedExercises: AdvancedExerciseName[]
}) => {
  return (
    <>
      <h3
        style={{
          marginTop: 40,
        }}
      >
        AI Recommended Exercises
      </h3>
      <h4>Chat Exercises</h4>
      {chatExercises.map(({ name, description }) => (
        <Ex
          key={name}
          name={name}
          description={description}
          link={getChatExerciseLink({ name, description, id: -1 })}
        />
      ))}
      <h4>Advanced Exercises</h4>
      {advancedExercises.map((exercise) => (
        <Ex
          key={exercise}
          name={exercise}
          description={advancedExerciseDescriptions[exercise]}
          link={'/exercise/' + exercise}
        />
      ))}
      <IonButton href={getChatExerciseLink({ ...chatExercises[0], id: -1 })}>
        Practice Now
        <IonIcon icon={caretForward} />
      </IonButton>
    </>
  )
}
const Ex = ({
  name,
  description,
  link,
}: {
  name: string
  description: string
  link: string
}) => {
  return (
    <div
      style={{
        boxShadow: '0px 6px 16px 0px rgba(160, 31, 60, 0.04)',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
      }}
    >
      <Link
        to={link}
        style={{
          textDecoration: 'none',
          color: 'black',
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: 12,
            marginBottom: 6,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontWeight: 300,
            fontSize: 12,
          }}
        >
          {description}
        </div>
      </Link>
    </div>
  )
}
