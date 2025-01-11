import React, { useState } from 'react'
import { ExerciseBase } from '../exerciseBase'
import { IonButton } from '@ionic/react'

export const MultipleChoice = ({
  instruction,
  dataPrompt,
  dataConform,
}: {
  instruction: string
  dataPrompt: string
  dataConform: (data: any) => {
    sentence: string
    incorrectOption: string
    correctOption: string
  }
}) => {
  const [data, setData] = useState({
    sentence: '',
    incorrectOption: '',
    correctOption: '',
  })

  const Buttons = ({
    setFeedbackAndGetData,
  }: {
    setFeedbackAndGetData: (f: string) => void
  }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '50%',
      }}
      className={'ion-margin'}
    >
      {[
        <IonButton
          key={'incorrect'}
          onClick={() => {
            setFeedbackAndGetData('Incorrect!')
          }}
          size="large"
        >
          {data.incorrectOption}
        </IonButton>,
        <IonButton
          key={'correct'}
          onClick={() => {
            setFeedbackAndGetData('Correct!')
          }}
          size="large"
        >
          {data.correctOption}
        </IonButton>,
      ].sort(() => Math.random() - 0.5)}
    </div>
  )

  return (
    <ExerciseBase
      instruction={instruction}
      dataPrompt={dataPrompt}
      dataSetter={(data) => {
        setData(dataConform(data))
      }}
      content={<p dangerouslySetInnerHTML={{ __html: data.sentence }} />}
      Buttons={Buttons}
    />
  )
}
