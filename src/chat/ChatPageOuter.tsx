import * as React from 'react'
import { useContext, useState } from 'react'
import { useParams } from 'react-router'
import Chat from './Chat'
import { UserContext } from '../UserContext'
import { IonButton, IonTextarea } from '@ionic/react'

import { ExerciseTemplate } from '../supa-types'
import { getChatPrompt } from './getChatPrompt'

export const ChatPageOuter = () => {
  const params = useParams<{ exercise: string }>()
  const paramsExercise = params.exercise
  let exercise: null | ExerciseTemplate = null
  if (paramsExercise) {
    exercise = JSON.parse(decodeURIComponent(paramsExercise))
  }
  const { user, isAdmin } = useContext(UserContext)
  const [prompt, setPrompt] = useState(getChatPrompt(user, exercise))
  const [promptOpen, setPromptOpen] = useState(false)

  return (
    <>
      {isAdmin && (
        <div style={{ position: 'fixed', zIndex: 102, background: 'white' }}>
          <IonButton onClick={() => setPromptOpen((o) => !o)}>
            {promptOpen ? 'close and test' : 'admin'} prompt
          </IonButton>
          {promptOpen && (
            <div>
              <IonTextarea
                value={prompt}
                onIonChange={(e) => e.target.value && setPrompt(e.target.value)}
                style={{ flexGrow: 1, height: '100%' }}
                autoGrow
              />
            </div>
          )}
        </div>
      )}
      <Chat key={prompt} prompt={prompt} exercise={exercise} />
    </>
  )
}
export const getChatExerciseLink = (exercise: ExerciseTemplate) =>
  `/chat/${encodeURIComponent(JSON.stringify(exercise))}`
