import { getSubTopic } from './exerciseBase'
import { useEffect, useState } from 'react'
import { chatJson1 } from '../supa-functions'
import { useUserContext } from '../UserContext'
import { ExerciseCenter } from './exerciseCenter'
import { commonExercisePrompt } from './commonExercisePrompt'
import { IonButton, IonSpinner, useIonRouter } from '@ionic/react'

export const Association = () => {
  const [loading, setLoading] = useState(false)
  const { user } = useUserContext()
  useEffect(() => {
    const f = async () => {
      setLoading(true)
      const topic = await getSubTopic(user.interests)
      const r: {
        leftWord: string
        rightWord: string
        leftWordAssociations: string[]
        rightWordAssociations: string[]
      } = await chatJson1([
        {
          role: 'system',
          content: `${commonExercisePrompt(user, topic)}
            Select a left word and a right word.
            Select 5 words that relate to the left word.
            Select 5 words that relate to the right word.
            Return JSON: { "leftWord": string, "rightWord": string, 
            "leftWordAssociations": string[],
            "rightWordAssociations": string[] }`,
        },
      ])
      setLeftWord(r.leftWord)
      setRightWord(r.rightWord)
      const leftWordsWithLabels = r.leftWordAssociations.map(
        (w) =>
          ({
            word: w,
            label: 'left',
          } as const)
      )
      const rightWordsWithLabels = r.rightWordAssociations.map(
        (w) =>
          ({
            word: w,
            label: 'right',
          } as const)
      )

      const shuffledWords: Words = [
        ...leftWordsWithLabels,
        ...rightWordsWithLabels,
      ].sort(() => Math.random() - 0.5)
      setWords(shuffledWords)

      setLoading(false)
    }
    f()
  }, [])
  const [leftWord, setLeftWord] = useState('')
  const [rightWord, setRightWord] = useState('')
  const [words, setWords] = useState<Words>()
  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState('')
  const router = useIonRouter()
  const currentWord = words?.[index]
  if (!currentWord) return <IonSpinner />
  return (
    <ExerciseCenter
      instruction={
        'Choose the word that is most closely related to this word: ' +
        currentWord.word
      }
      loading={loading}
      feedback={feedback}
      setFeedbackAndAdvance={(f) => {
        setFeedback(f)
        if (index < words!.length - 1) {
          setIndex(index + 1)
        } else {
          if (router.canGoBack()) router.goBack()
          else router.push('/exercises')
        }
      }}
      clearFeedback={() => setFeedback('')}
    >
      <IonButton
        onClick={() => {
          if (currentWord.label === 'left') {
            setFeedback('Correct')
          } else {
            setFeedback('Incorrect')
          }
          setIndex(index + 1)
        }}
      >
        {leftWord}
      </IonButton>
      <IonButton
        onClick={() => {
          if (currentWord.label === 'right') {
            setFeedback('Correct')
          } else {
            setFeedback('Incorrect')
          }
          setIndex(index + 1)
        }}
      >
        {rightWord}
      </IonButton>
    </ExerciseCenter>
  )
}
type Words = { word: string; label: 'left' | 'right' }[]
