import { useUserContext } from '../UserContext'
import React, { useEffect, useState } from 'react'
import { ExerciseCenter } from './exerciseCenter'
import { chatJson0 } from '../supa-functions'
import { commonExercisePrompt } from './commonExercisePrompt'
import { useIonRouter } from '@ionic/react'

export const ExerciseBase = ({
  instruction,
  dataPrompt,
  dataSetter,
  content,
  Buttons,
}: {
  instruction: string
  dataPrompt: string
  dataSetter: (data: any) => void
  content: JSX.Element
  Buttons: React.FC<{
    setFeedbackAndGetData: (f: string) => void
  }>
}) => {
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')
  const { user } = useUserContext()
  const [topic, setTopic] = useState('')
  const [topicWords, setTopicWords] = useState([''])
  const [index, setIndex] = useState(0)

  const getTopic = async () => {
    setLoading(true)

    const topic = await getSubTopic(user.interests)
    setTopic(topic)

    const r3 = await chatJson0([
      {
        role: 'system',
        content: `Return a list of 10 vocabulary words relating to: ${topic}
         Return JSON: { "words": string[] }`,
      },
    ])
    const data3 = JSON.parse(r3.data)

    setTopicWords(data3.words)

    setLoading(false)
  }
  useEffect(() => {
    getTopic()
  }, [])

  const getData = async (index: number) => {
    setLoading(true)

    const r = await chatJson0([
      {
        role: 'system',
        content: `${commonExercisePrompt(
          user,
          topic,
          topicWords[index]
        )} ${dataPrompt}`,
      },
    ])
    const data = JSON.parse(r.data)
    dataSetter(data)

    setLoading(false)
  }

  useEffect(() => {
    if (topic) getData(0)
  }, [topicWords])

  const router = useIonRouter()
  const setFeedbackAndGetData = (f: string) => {
    setFeedback(f)
    const nextIndex = index + 1
    if (nextIndex >= topicWords.length) return router.goBack()
    setIndex(nextIndex)
    getData(nextIndex)
  }

  return (
    <>
      <ExerciseCenter
        instruction={instruction}
        loading={loading}
        feedback={feedback}
        setFeedbackAndAdvance={setFeedbackAndGetData}
        clearFeedback={() => setFeedback('')}
      >
        {content}
      </ExerciseCenter>
      {!loading && <Buttons setFeedbackAndGetData={setFeedbackAndGetData} />}
    </>
  )
}
export const getSubTopic = async (interests: string) => {
  const r0 = await chatJson0([
    {
      role: 'system',
      content: `Return a subtopic of: ${interests}
         Return JSON: { "subtopic": string }`,
    },
  ])
  const data0 = JSON.parse(r0.data)

  const r1 = await chatJson0([
    {
      role: 'system',
      content: `Return a subtopic of: ${data0.subtopic}
         Return JSON: { "subtopic": string }`,
    },
  ])
  const data1 = JSON.parse(r1.data)

  const r2 = await chatJson0([
    {
      role: 'system',
      content: `Return a subtopic of: ${data1.subtopic}
         Return JSON: { "subtopic": string }`,
    },
  ])
  const data2 = JSON.parse(r2.data)
  const topic = data2.subtopic
  return topic
}
