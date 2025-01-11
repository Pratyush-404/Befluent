import { useEffect, useState } from 'react'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonPage,
  useIonRouter,
} from '@ionic/react'
import { AudioRecorder } from '../components/AudioRecorder'
import { formatDuration } from '../../utils'
import { isDev } from '../environment'
import { Pending } from './pending'
import { transcribe } from '../supa-functions'

export default function Page() {
  const [blob, setBlob] = useState<Blob | null>(null)
  const [blobURL, setBlobURL] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [clarityScore, setClarityScore] = useState(-1)
  const [timePassed, setTimePassed] = useState(0)
  const router = useIonRouter()

  const base64ToBlob = (data: string) => {
    const byteCharacters = atob(data)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    setBlob(new Blob([byteArray]))
  }

  useEffect(() => {
    window.addEventListener('message', (event) => {
      // if (
      // event.origin === 'https://your-chrome-extension-id' ||
      // event.origin === 'https://your-web-app.com'
      // ) {
      const base64Data = event.data
      if (base64Data) {
        base64ToBlob(base64Data)
      }
    })
  }, [])

  //save last blob
  useEffect(() => {
    if (!blob) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64data = reader.result as string
      localStorage.setItem('lastBlob', base64data.split(',')[1])
    }
    reader.readAsDataURL(blob)
  }, [blob])

  //read last blob
  useEffect(() => {
    const savedBlob = localStorage.getItem('lastBlob')
    if (savedBlob) {
      base64ToBlob(savedBlob)
    }
  }, [])

  //blob to blob url
  useEffect(() => {
    if (blob) {
      const url = URL.createObjectURL(blob)
      setBlobURL(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [blob])

  const downloadBlob = (blob: Blob) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = new Date().toDateString() + '.webm'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <IonPage className={'ion-justify-content-center ion-align-items-center'}>
      <IonContent>
        <h1>Meeting Recorder</h1>
        <ol
          style={{
            width: 'fit-content',
            margin: 'auto',
          }}
        >
          <h3>Steps:</h3>
          <li>Click start recording</li>
          <li>
            Leave this tab running in the background while you take your meeting
          </li>
          <li>
            Return to this tab to stop the recording, process it, and view your
            report!
          </li>
        </ol>
        <div className={'ion-text-center'}>
          <AudioRecorder
            onRecordingComplete={(blob: Blob) => {
              setBlob(blob)
            }}
            setTimePassed={setTimePassed}
            timeLimit={limit}
          />
          <div> Duration: {formatDuration(timePassed)}</div>
          {blob && (
            <>
              <div>
                <audio controls src={blobURL || ''}>
                  Your browser does not support the audio element.
                </audio>
              </div>
              <IonButton
                onClick={async () => {
                  setPending(true)
                  const { data, error } = await transcribe(blob)
                  if (error) alert(error)
                  if (data) {
                    setTranscript(data.text)
                    let totalClarityScore = 0
                    data.segments.forEach((segment) => {
                      totalClarityScore += calculateClarityScore(
                        segment.avg_logprob,
                        segment.no_speech_prob
                      )
                    })
                    const averageClarityScore =
                      totalClarityScore / data.segments.length
                    setClarityScore(averageClarityScore)
                  }
                  setPending(false)
                }}
                disabled={pending}
              >
                Send
              </IonButton>
              {isDev && (
                <IonButton onClick={() => downloadBlob(blob)}>
                  Download
                </IonButton>
              )}
            </>
          )}
          {pending && <Pending />}
          {transcript && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle className={'ion-text-capitalize'}>
                  Transcript:
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>{transcript}</IonCardContent>
              <IonButton
                onClick={() => {
                  localStorage.setItem('transcript', transcript)
                  localStorage.setItem('clarityScore', String(clarityScore))
                  router.push('/report')
                }}
              >
                View Report
              </IonButton>
            </IonCard>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}
const limit = 60 * 25 //25 min

function calculateClarityScore(
  avgLogprob: number,
  noSpeechProb: number
): number {
  return Math.max(
    Math.round((Math.exp(avgLogprob) * 1.6 - noSpeechProb * 1.6) * 100),
    0
  )
}
// const unclear = calculateClarityScore(-0.72, 0.27)
// console.log(`unclear`, unclear)
// const clear0 = calculateClarityScore(-0.62, 0.02)
// console.log(`clear0`, clear0)
// const clear1 = calculateClarityScore(-0.52, 0.09)
// console.log(`clear1`, clear1)
