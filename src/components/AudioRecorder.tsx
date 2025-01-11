import { Dispatch, SetStateAction, useRef, useState, useEffect } from 'react'
import { IonButton } from '@ionic/react'

export const AudioRecorder = ({
  onRecordingComplete,
  setTimePassed,
  timeLimit,
  autoStart = false,
}: {
  onRecordingComplete: (blob: Blob) => void
  setTimePassed: Dispatch<SetStateAction<number>>
  timeLimit: number
  autoStart?: boolean
}) => {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const timer = useRef(-1)

  const startRecording = async () => {
    setTimePassed(0)

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder.current = new MediaRecorder(stream)
    const audioChunks: Blob[] = []

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.push(event.data)
    }

    mediaRecorder.current.onstop = () => {
      window.clearInterval(timer.current)
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
      onRecordingComplete(audioBlob)
    }

    mediaRecorder.current.start()
    setIsRecording(true)
    timer.current = window.setInterval(() => {
      setTimePassed((t) => {
        if (t === timeLimit) {
          stopRecording()
          return t
        }
        return t + 1
      })
    }, 1000)
  }

  const stopRecording = () => {
    mediaRecorder.current?.stop()
    setIsRecording(false)
  }

  useEffect(() => {
    if (autoStart) startRecording()
  }, [autoStart])

  return (
    <div>
      <div>
        {!isRecording ? (
          <IonButton onClick={startRecording}>Start Recording</IonButton>
        ) : (
          <IonButton onClick={stopRecording}>Stop Recording</IonButton>
        )}
      </div>
    </div>
  )
}
