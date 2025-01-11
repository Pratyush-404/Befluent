import {
  IonButton,
  IonChip,
  IonInput,
  IonList,
  IonPage,
  IonRow,
  IonSpinner,
} from '@ionic/react'
import { NoraBg } from './NoraBg'
import { WebDownload } from '../WebDownload'
import { AssistantMessage } from './AssistantMessage'
import { UserMessage } from './UserMessage'
import { ExerciseRecommender } from './ExerciseRecommender'
import { Speak } from './Speak'
import { ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { Capacitor } from '@capacitor/core'
import { Messages } from './Chat'

export const ChatBase = ({
  headerChildren,
  messages,
  setUserInputTypeListen,
  setUserOutputType,
  hints,
  sendCb,
  enableExerciseRecommender,
}: {
  headerChildren?: ReactNode
  messages: Messages
  setUserInputTypeListen?: () => void
  setUserOutputType?: (t: 'write' | 'speak') => void
  hints: string[] | undefined
  sendCb(text: string): Promise<void>
  enableExerciseRecommender?: boolean
}) => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const send = async () => {
    setLoading(true)
    setShowHints(false)
    const inputLocal = input
    setInput('')
    await sendCb(inputLocal)
    setLoading(false)
  }

  const listRef = useRef<HTMLIonListElement>(null)
  useLayoutEffect(() => {
    if (!listRef.current) return
    const a = setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = 100000
      }
    }, 100)
    return () => clearTimeout(a)
  }, [messages.length])
  return (
    <IonPage style={{ background: 'var(--ion-color-secondary)' }}>
      <IonRow
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {NoraBg}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            alt="nora"
            src={'nora.png'}
            style={{
              maxHeight: 70,
            }}
          />
          <IonSpinner
            style={{
              position: 'absolute',
              top: '100%',
              visibility: loading ? 'visible' : 'hidden',
            }}
          />
        </div>
        {headerChildren}
      </IonRow>
      {isWeb && <WebDownload messagesLength={messages.length} />}
      <IonList
        style={{ overflowY: 'auto', flexGrow: 1, background: 'transparent' }}
        ref={listRef}
      >
        {messages.map((m, i) => {
          if (m.role === 'assistant') {
            return (
              <AssistantMessage
                key={i}
                content={m.content}
                setUserInputTypeListen={setUserInputTypeListen}
                showHint={
                  i === messages.length - 1 && hints && hints.length > 0
                    ? () => setShowHints(true)
                    : undefined
                }
              />
            )
          } else if (m.role === 'user') {
            return <UserMessage key={i} content={m.content} />
          }
        })}
      </IonList>
      <div>
        {showHints &&
          hints?.map((o) => (
            <IonChip
              key={o}
              className={'ion-text-capitalize'}
              style={{ ['--background']: 'var(--ion-color-warning)' }}
            >
              {o}
            </IonChip>
          ))}
        {enableExerciseRecommender && (
          <ExerciseRecommender messages={messages.slice(-4)} />
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IonInput
          type={'text'}
          value={input}
          onIonInput={(e) => {
            setInput(e.detail.value || '')
            setUserOutputType?.('write')
          }}
          onKeyDown={(e) => {
            e.key === 'Enter' && send()
          }}
          style={{ background: 'white', borderRadius: 10 }}
        />
        <Speak
          onResult={(text) => {
            setInput(text)
            setUserOutputType?.('speak')
          }}
        />
        <IonButton onClick={() => send()}>Send</IonButton>
      </div>
    </IonPage>
  )
}
const isWeb = Capacitor.getPlatform() === 'web'
