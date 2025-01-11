import { useEffect, useState } from 'react'
import { useAuthUser } from '../../AuthUserProvider'
import { supa } from '../../../supabase'
import { CircularProgressBar } from '../../circularProgressBar'
import { AudioRecorder } from '../../components/AudioRecorder'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react'
import { UserLevel } from '../../supa-types'

export const SpeakEval0 = ({
  id,
  next,
  limit,
}: {
  id: '0' | '1'
  next?: () => void
  limit: number
}) => {
  const [blob, setBlob] = useState<Blob>()
  const [pending, setPending] = useState(false)
  const [results, setResults] = useState<SpeakResult>()
  const authUser = useAuthUser()
  const [timePassed, setTimePassed] = useState(0)

  useEffect(() => {
    if (!results || !authUser) return
    supa
      .from('evaluations')
      .upsert({
        user_id: authUser.id,
        ['speak' + id]: results.level,
      })
      .then()
  }, [results?.level])
  return (
    <div className={'ion-text-center'}>
      <div>
        <CircularProgressBar
          total={limit}
          remaining={limit - timePassed}
          color={'primary'}
        />
      </div>
      <AudioRecorder
        onRecordingComplete={(blob) => {
          setBlob(blob)
        }}
        setTimePassed={setTimePassed}
        timeLimit={limit}
      />
      {blob && (
        <IonButton
          onClick={async () => {
            setPending(true)
            const { data, error } = await supaFunctionsSpeak(blob)
            if (error) alert(error)
            if (data) setResults(data)
            setPending(false)
          }}
          disabled={pending}
        >
          Send
        </IonButton>
      )}
      {pending && <div>Processing...</div>}
      {results && (
        <>
          {Object.entries(results).map(([key, value]) => (
            <IonCard key={key}>
              <IonCardHeader>
                <IonCardTitle className={'ion-text-capitalize'}>
                  {key}:
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>{value}</IonCardContent>
            </IonCard>
          ))}

          <br />
          {next && <IonButton onClick={next}>Next</IonButton>}
        </>
      )}
    </div>
  )
}
type SpeakResult = {
  transcript: string
  level: UserLevel
}
const supaFunctionsSpeak = async (blob: Blob) => {
  const formData = new FormData()
  formData.append('blob', blob)
  return await supa.functions.invoke<SpeakResult>('speak', {
    body: formData,
  })
}
