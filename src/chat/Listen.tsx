import { useState } from 'react'
import { IonButton, IonIcon, IonSpinner } from '@ionic/react'
import { volumeHighOutline } from 'ionicons/icons'
import { TTS } from '../../tts'

export function Listen(props: {
  content: string
  setUserInputType?: () => void
}) {
  const [running, setRunning] = useState(false)
  return (
    <IonButton
      onClick={async () => {
        setRunning(true)
        props.setUserInputType?.()
        TTS(props.content).then(async (src) => {
          const audio = new Audio(src)
          await audio.play()
          audio.onended = () => setRunning(false)
        })
      }}
      fill="clear"
      disabled={running}
      style={{ height: 20 }}
    >
      {!running ? <IonIcon icon={volumeHighOutline} /> : <IonSpinner />}
    </IonButton>
  )
}
