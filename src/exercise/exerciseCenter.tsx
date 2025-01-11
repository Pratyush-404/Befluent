import { ReactNode } from 'react'
import { IonAlert, IonSpinner } from '@ionic/react'
import { Timer } from './timer'

export const ExerciseCenter = ({
  instruction,
  children,
  loading,
  feedback,
  setFeedbackAndAdvance,
  clearFeedback,
}: {
  instruction: string
  children?: ReactNode
  loading: boolean
  feedback: string
  setFeedbackAndAdvance: (f: string) => void
  clearFeedback: () => void
}) => {
  return (
    <div
      style={{
        position: 'relative',
        bottom: 40,
        background: 'white',
        borderRadius: 10,
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      }}
      className={'ion-padding'}
    >
      <Timer
        setFeedback={setFeedbackAndAdvance}
        newQuestion={feedback === ''}
      />
      <div style={{ color: 'var(--ion-color-medium)' }}>{instruction}</div>
      <div style={{ fontSize: 24, color: 'var(--ion-color-primary)' }}>
        {children}
      </div>
      {loading && <IonSpinner />}
      {feedback && (
        <IonAlert
          isOpen={!!feedback}
          message={feedback}
          buttons={['Continue']}
          onDidDismiss={clearFeedback}
        />
      )}
    </div>
  )
}
