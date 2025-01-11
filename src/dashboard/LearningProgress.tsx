import * as React from 'react'
import { Stats } from '../Stats'
import { IonSpinner } from '@ionic/react'
import { useEval } from '../EvalProvider'

export const LearningProgress = () => {
  const data = useEval()
  return (
    <>
      <h2>Learning Progress</h2>
      {!data ? <IonSpinner /> : <Stats {...data} />}
    </>
  )
}
