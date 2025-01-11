import { useState } from 'react'
import { chatJson0 } from '../supa-functions'
import { IonButton, IonInput } from '@ionic/react'
import { ExerciseBase } from './exerciseBase'

export const Eloquence = () => {
  const [data, setData] = useState<{
    direction: string
    sentenceWithMarks: string
    acceptableAnswers: string
  }>({
    direction: '',
    sentenceWithMarks: '',
    acceptableAnswers: '',
  })

  return (
    <ExerciseBase
      instruction={'Replace the highlighted word. ' + data.direction}
      dataPrompt={`${promptStart}
          
          You return JSON like: { "direction": string, "sentenceWithMarks": string, "acceptableAnswers": string}
        `}
      dataSetter={(data) =>
        setData({
          direction: data.direction,
          sentenceWithMarks: data.sentenceWithMarks,
          acceptableAnswers: data.acceptableAnswers,
        })
      }
      content={
        <p dangerouslySetInnerHTML={{ __html: data.sentenceWithMarks }} />
      }
      Buttons={({ setFeedbackAndGetData }) => (
        <Buttons data={data} setFeedbackAndGetData={setFeedbackAndGetData} />
      )}
    />
  )
}
const Buttons = ({
  data,
  setFeedbackAndGetData,
}: {
  data: {
    direction: string
    sentenceWithMarks: string
    acceptableAnswers: string
  }
  setFeedbackAndGetData: (f: string) => void
}) => {
  const [input, setInput] = useState('')
  return (
    <>
      <IonInput
        type={'text'}
        value={input}
        onIonInput={(e) =>
          typeof e.target.value === 'string' && setInput(e.target.value)
        }
        placeholder={'Your answer...'}
        style={{
          background: 'var(--ion-color-secondary)',
          borderRadius: 10,
        }}
      />
      <IonButton
        onClick={async () => {
          const r = await chatJson0([
            {
              role: 'system',
              content: `${promptStart}
                          
                User Exercise:
                Direction: ${data.direction}
                SentenceWithMarks: ${data.sentenceWithMarks}
                Acceptable answers: ${data.acceptableAnswers}
                
                User answer: ${input}
                Give the user feedback on their answer.
                You return JSON like: { "feedback": string }
              `,
            },
          ])
          setFeedbackAndGetData(JSON.parse(r.data).feedback)
          setInput('')
        }}
      >
        Check
      </IonButton>
    </>
  )
}
const promptStart = `Exercise: Eloquence
  Exercise Description: Replace the word / phrase in <mark></mark> according to the direction.  
  
  Example 1:
  Direction: Be more complimentary.
  SentenceWithMarks: You did a <mark>fine</mark> job in the play.
  Acceptable answers: Great, good, nice, commendable, stellar, spectacular, wonderful
  
  Example 2:
  Direction: Be more extreme.
  SentenceWithMarks: The sky was <mark>dark</mark> because of the oncoming storm.
  Acceptable answers: Scary, frightening, impenetrable, foul, threatening`
