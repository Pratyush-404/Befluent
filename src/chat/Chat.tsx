import { useEffect, useRef, useState } from 'react'
import { IonButton, useIonRouter } from '@ionic/react'
import { supa } from '../../supabase'
import { useUserContext } from '../UserContext'
import { chatJson0 } from '../supa-functions'
import { ExerciseTemplate } from '../supa-types'
import { ChatBase } from './ChatBase'

export type Messages = (
  | {
      role: 'system' | 'user'
      content: string
    }
  | {
      role: 'assistant'
      content: string
    }
)[]

export default function Chat({
  prompt,
  exercise,
}: {
  prompt: string
  exercise: ExerciseTemplate | null
}) {
  const { setUser } = useUserContext()
  const router = useIonRouter()
  const [messages, setMessages] = useState<Messages>([
    {
      role: 'system',
      content: prompt,
    },
  ])
  const [userOptions, setUserOptions] = useState<string[]>()

  //init chat
  useEffect(() => {
    setTimeout(() => {
      send("Let's begin!")
    }, 500)
  }, [prompt])

  //inc session count
  useEffect(() => {
    setUser((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        session_count: prev.session_count + 1,
      }
    })
  }, [])

  const sessionResults = useRef({
    questionsPracticed: 0,
    correct: 0,
    incorrect: 0,
    read_score: 5,
    write_score: 5,
    listen_score: 5,
    speak_score: 5,
  })
  const [userInputType, setUserInputType] = useState<'read' | 'listen'>('read')
  const [userOutputType, setUserOutputType] = useState<'write' | 'speak'>(
    'write'
  )
  const send = async (inputArg: string) => {
    const nextMessages: Messages = [
      ...messages,
      { role: 'user', content: inputArg },
    ]
    setMessages(nextMessages)

    //correctness check
    if (messages.length > 2)
      supa.functions
        .invoke('chat', {
          body: [
            ...nextMessages.slice(-2),
            {
              role: 'user',
              content: `is my response correct? answer with one of the words: yes or no`,
            },
          ],
        })
        .then((r) => {
          if (r.error) return alert(r.error.message)
          const isCorrect = !!(r.data as string).match(/yes/i)
          if (isCorrect) {
            sessionResults.current.correct++
            setUser((prev) => {
              if (!prev) return prev
              return {
                ...prev,
                correct_count: prev.correct_count + 1,
              }
            })
          } else {
            sessionResults.current.incorrect++
            setUser((prev) => {
              if (!prev) return prev
              return {
                ...prev,
                incorrect_count: prev.incorrect_count + 1,
              }
            })
          }
          sessionResults.current.questionsPracticed++
          const incDiff = isCorrect ? 10 : 0
          const sessionResultsCopy = { ...sessionResults.current }
          setUser((prev) => {
            if (!prev) return prev
            const addition: Partial<typeof prev> = {}
            if (userInputType === 'read') {
              addition.read_score = Math.round((prev.read_score + incDiff) / 2)
              sessionResults.current.read_score = Math.round(
                (sessionResultsCopy.read_score + incDiff) / 2
              )
            } else if (userInputType === 'listen') {
              addition.listen_score = Math.round(
                (prev.listen_score + incDiff) / 2
              )
              sessionResults.current.listen_score = Math.round(
                (sessionResultsCopy.listen_score + incDiff) / 2
              )
            }
            if (userOutputType === 'write') {
              addition.write_score = Math.round(
                (prev.write_score + incDiff) / 2
              )
              sessionResults.current.write_score = Math.round(
                (sessionResultsCopy.write_score + incDiff) / 2
              )
            } else if (userOutputType === 'speak') {
              addition.speak_score = Math.round(
                (prev.speak_score + incDiff) / 2
              )
              sessionResults.current.speak_score = Math.round(
                (sessionResultsCopy.speak_score + incDiff) / 2
              )
            }
            return {
              ...prev,
              ...addition,
            }
          })
        })

    await chatJson0([...nextMessages]).then((r) => {
      setMessages(() => [
        ...nextMessages,
        {
          role: 'assistant',
          content: r.data,
        },
      ])
      const data = JSON.parse(r.data) as {
        feedback: string
        message: string
        question: string
        userOptions: string[]
      }
      setUserOptions(data.userOptions)
    })

    setUserInputType('read')
  }
  return (
    <ChatBase
      headerChildren={
        exercise && (
          <div
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
            }}
          >
            <div>Exercise: </div>
            <div>{exercise.name}</div>
            <IonButton
              onClick={() => {
                const dataForResultsPage: ResultsPageData = {
                  exercise: exercise.name,
                  ...sessionResults.current,
                }
                sessionStorage.setItem(
                  'results',
                  JSON.stringify(dataForResultsPage)
                )
                router.push('/results')
              }}
              color={'secondary'}
            >
              Finish
            </IonButton>
          </div>
        )
      }
      messages={messages.slice(1)}
      setUserInputTypeListen={() => setUserInputType('listen')}
      setUserOutputType={setUserOutputType}
      hints={userOptions}
      sendCb={send}
      enableExerciseRecommender={!exercise}
    />
  )
}

export type ResultsPageData = {
  exercise: string

  questionsPracticed: number
  correct: number
  incorrect: number
  read_score: number
  write_score: number
  listen_score: number
  speak_score: number
}
