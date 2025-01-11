import { CSSProperties, useRef, useState } from 'react'
import { IonButton, IonIcon } from '@ionic/react'
import { mic, recording } from 'ionicons/icons'

export const Speak = ({
  style,
  text,
  onResult,
  onEnd,
}: {
  style?: CSSProperties
  text?: string
  onResult?: (text: string) => void
  onEnd?: (data: { transcript: string; confidence: number }) => void
}) => {
  const [isRecording, setIsRecording] = useState(false)

  const speechRef = useRef()
  const startRecording = () => {
    const SpeechRecognition =
      // @ts-expect-error - Property 'webkitSpeechRecognition' does not exist on type 'Window & typeof globalThis'.
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      speechRef.current = recognition
      recognition.lang = 'en-US'
      recognition.interimResults = true

      recognition.onstart = () => {
        setIsRecording(true)
      }
      recognition.start()

      let transcript = ''
      let confidence = 0

      recognition.onresult = (event: {
        results: SpeechRecognitionResultList
      }) => {
        let localTranscript = ''
        for (let i = 0; i < event.results.length; i++) {
          for (let j = 0; j < event.results[i].length; j++) {
            localTranscript += event.results[i][j].transcript
            confidence = event.results[i][j].confidence
          }
        }
        onResult?.(localTranscript)
        transcript = localTranscript
      }
      recognition.onend = () => {
        setIsRecording(false)
        onEnd?.({ transcript, confidence })
      }
      recognition.onerror = (event: { error: string }) => {
        console.error('Speech recognition error', event.error)
        setIsRecording(false)
      }
    } else {
      console.error('Speech recognition not available')
    }
  }

  const stopRecording = async () => {
    if (speechRef.current) {
      // @ts-expect-error - Property 'stop' does not exist on type 'SpeechRecognition'.
      speechRef.current.stop()
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: '100%',
        }}
      >
        {isRecording && (
          <IonIcon
            size={'large'}
            icon={recording}
            style={{
              color: 'red',
            }}
          />
        )}
      </div>
      <IonButton
        onPointerDown={startRecording}
        onPointerUp={stopRecording}
        onContextMenu={(e) => e.preventDefault()}
        color={'primary'}
        shape="round"
        size="large"
        style={{
          textTransform: 'none',
          padding: 10,
          ...style,
        }}
      >
        <IonIcon slot="icon-only" size={'large'} color={'light'} icon={mic} />
        {text}
      </IonButton>
    </div>
  )
}
