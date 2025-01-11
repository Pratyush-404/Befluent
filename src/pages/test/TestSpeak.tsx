import { IonPage } from '@ionic/react'
import { SpeakEval0 } from './SpeakEval0'

export default function TestSpeak({
  id,
  next,
}: {
  id: '0' | '1'
  next: () => void
}) {
  return (
    <IonPage className={'ion-justify-content-center ion-align-items-center'}>
      <h1>Speak Test {+id + 1}</h1>
      <p>{data[id]}</p>
      <p>Speak for {duration} seconds.</p>
      <SpeakEval0 id={id} next={next} limit={duration} />
    </IonPage>
  )
}

const data = [
  'Speak about yourself.',
  'How do you like to spend your free time?',
]
const duration = 30
