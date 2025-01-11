import { Fragment, useState } from 'react'
import { useAuthUserObject } from '../../AuthUserProvider'
import { IonButton, IonSelect, IonSelectOption } from '@ionic/react'
import { supa } from '../../../supabase'

export default function TestListen({
  id,
  next,
}: {
  id: '0' | '1'
  next: () => void
}) {
  const [answers, setAnswers] = useState<{
    [k: number]: 't' | 'f' | 'd' | undefined
  }>({})
  const { authUser } = useAuthUserObject()
  const [playsRemaining, setPlaysRemaining] = useState(2)
  if (!authUser) return 'no user'
  const save = async () => {
    for (const qi of [0, 1, 2]) {
      const qGroup = data[id]
      const question = qGroup[qi]
      const input = answers[qi]
      const correct = question.correct === input
      const dbKey = `listen${+id * 3 + qi}`
      await supa.from('evaluations').upsert({
        user_id: authUser.id,
        [dbKey]: correct,
      })
    }
    setAnswers({})
    next()
  }
  return (
    <div className={'ion-padding'}>
      <h1>Listen Test {+id + 1}</h1>
      <p>Listen to the audio carefully and answer the questions</p>
      <p>Audio plays remaining: {playsRemaining}</p>
      {playsRemaining > 0 ? (
        <audio
          src={`/eval${id}.ogg`}
          onEnded={() => setPlaysRemaining(playsRemaining - 1)}
          controls
        />
      ) : (
        <p>No more plays remaining.</p>
      )}
      {data[id].map((question, qi) => {
        return (
          <Fragment key={qi}>
            <IonSelect
              label={question.question}
              value={answers[qi] || 'blank'}
              onIonChange={(e) =>
                setAnswers({
                  ...answers,
                  [qi]: e.target.value as 't' | 'f' | 'd',
                })
              }
            >
              <IonSelectOption value={'blank'}></IonSelectOption>
              <IonSelectOption value={'t'}>True</IonSelectOption>
              <IonSelectOption value={'f'}>False</IonSelectOption>
              <IonSelectOption value={'d'}>Don't Know</IonSelectOption>
            </IonSelect>
          </Fragment>
        )
      })}
      <IonButton onClick={save} className={'ion-float-end'}>
        Save
      </IonButton>
    </div>
  )
}
const data: {
  [q: number]: { question: string; correct: 't' | 'f' }[]
} = {
  0: [
    {
      question: 'The portsmouth train will leave from platform 13',
      correct: 'f',
    },
    {
      question: 'Passengers for Portsmouth should get on train now',
      correct: 't',
    },
    {
      question: 'The Portsmouth train will leave at half past 6',
      correct: 't',
    },
  ],
  1: [
    {
      question: 'The new neighbor’s name is Benjamin',
      correct: 'f',
    },
    {
      question: 'He is from Germany',
      correct: 't',
    },
    {
      question: 'He works in a fashion outlet',
      correct: 'f',
    },
  ],
}
