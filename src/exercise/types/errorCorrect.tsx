import React, { ReactNode, useState } from 'react'
import { IonButton, IonGrid, IonIcon, IonRow } from '@ionic/react'
import { checkmarkSharp } from 'ionicons/icons'
import { ExerciseBase } from '../exerciseBase'

export const ErrorCorrect = ({
  instruction,
  dataPrompt,
  dataConform,
  children,
}: {
  instruction: string
  dataPrompt: string
  dataConform: (data: any) => {
    sentence: string
    valid: boolean
    explanation: string
  }
  children?: ReactNode
}) => {
  const [data, setData] = useState<{
    sentence: string
    valid: boolean
    explanation: string
  }>()

  const Buttons = ({
    setFeedbackAndGetData,
  }: {
    setFeedbackAndGetData: (f: string) => void
  }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: '5%',
        width: '100%',
      }}
    >
      <IonButton
        onClick={() => {
          if (!data) return
          if (!data.valid) {
            setFeedbackAndGetData('Correct! ' + data.explanation)
          } else {
            setFeedbackAndGetData('Incorrect. ' + data.explanation)
          }
        }}
      >
        <IonGrid>
          <IonRow>
            <span style={{ fontSize: '2rem', margin: 'auto' }}>X</span>
          </IonRow>
          <IonRow>Error</IonRow>
        </IonGrid>
      </IonButton>
      <IonButton
        onClick={() => {
          if (!data) return
          if (data.valid) {
            setFeedbackAndGetData('Correct! ' + data.explanation)
          } else {
            setFeedbackAndGetData('Incorrect. ' + data.explanation)
          }
        }}
      >
        <IonGrid>
          <IonRow>
            <IonIcon
              icon={checkmarkSharp}
              size={'large'}
              style={{ margin: 'auto' }}
            />
          </IonRow>
          <IonRow>Correct</IonRow>
        </IonGrid>
      </IonButton>
    </div>
  )

  return (
    <ExerciseBase
      instruction={instruction}
      dataPrompt={dataPrompt}
      dataSetter={(data) => {
        setData(dataConform(data))
      }}
      content={
        <>
          {data && <p dangerouslySetInnerHTML={{ __html: data.sentence }} />}
          {children}
        </>
      }
      Buttons={Buttons}
    />
  )
}
