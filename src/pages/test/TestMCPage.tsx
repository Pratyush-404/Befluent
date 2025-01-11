import { useAuthUserObject } from '../../AuthUserProvider'
import { IonButton, IonPage, IonProgressBar, useIonRouter } from '@ionic/react'
import { useParams } from 'react-router'
import { supa } from '../../../supabase'

export default function TestMCPage() {
  const { authUser } = useAuthUserObject()
  const router = useIonRouter()
  const { id } = useParams<{ id: string }>()
  const question = questions[id]
  const click = async (i: number) => {
    if (!authUser) return
    await supa.from('evaluations').upsert({
      user_id: authUser.id,
      ['mc' + id]: i === question.correct,
    })
    if (id == '20') router.push('/test/listen/0')
    else router.push('/test/mc/' + ('' + (+id + 1)).padStart(2, '0'))
  }
  return (
    <IonPage className={'ion-justify-content-start'}>
      <IonProgressBar value={+id / 21} />
      <p>
        For the question below, please choose the best option to complete the
        sentence or conversation.
      </p>
      <h2>{question.question}</h2>
      {question.answers.map((answer, i) => (
        <IonButton key={answer} onClick={() => click(i)}>
          {answer}
        </IonButton>
      ))}
    </IonPage>
  )
}

const questions: {
  [q: string]: { question: string; answers: string[]; correct: 0 | 1 | 2 | 3 }
} = {
  '01': {
    question: 'Can I park here?',
    answers: [
      'Sorry, I did that.',
      "It's the same place.",
      'Only for half an hour.',
    ],
    correct: 2,
  },
  '02': {
    question: "What colour will you paint the children's bedroom?",
    answers: [
      'I hope it was right.',
      "We can't decide.",
      "It wasn't very difficult.",
    ],
    correct: 1,
  },
  '03': {
    question: "I can't understand this email.",
    answers: [
      'Would you like some help?',
      "Don't you know?",
      'I suppose you can.',
    ],
    correct: 0,
  },
  '04': {
    question: "I'd like two tickets for tomorrow night.",
    answers: [
      'How much did you pay?',
      'Afternoon and evening.',
      "I'll just check for you.",
    ],
    correct: 2,
  },
  '05': {
    question: 'Shall we go to the gym now?',
    answers: ["I'm too tired.", "It's very good.", 'Not at all.'],
    correct: 2,
  },
  '06': {
    question:
      "His eyes were ...... bad that he couldn't read the number plate of the car in front.",
    answers: ['such', 'too', 'so', 'very'],
    correct: 2,
  },
  '07': {
    question:
      'The company needs to decide ...... and for all what its position is on this point.',
    answers: ['here', 'once', 'first', 'finally'],
    correct: 1,
  },
  '08': {
    question: "I'm sorry, I didn't ...... to disturb you.",
    answers: ['hope', 'think', 'mean', 'suppose'],
    correct: 2,
  },
  '09': {
    question: 'The singer ended the concert ...... her most popular song.',
    answers: ['by', 'with', 'in', 'As'],
    correct: 1,
  },
  '10': {
    question:
      'Would you mind ...... these plates a wipe before putting them in the cupboard?',
    answers: ['making', 'doing', 'getting', 'giving'],
    correct: 3,
  },
  '11': {
    question:
      'I was looking forward ...... at the new restaurant, but it was closed.',
    answers: ['to eat', 'to have eaten', 'to eating', 'eating'],
    correct: 0,
  },
  '12': {
    question:
      '...... tired Melissa is when she gets home from work, she always makes time to say goodnight to the children.',
    answers: ['Whatever', 'No matter how', 'However much', 'Although'],
    correct: 1,
  },
  '13': {
    question: 'It was only ten days ago ...... she started her new job.',
    answers: ['then', 'since', 'after', 'that'],
    correct: 3,
  },
  '14': {
    question:
      "The shop didn't have the shoes I wanted, but they've ...... a pair specially for me.",
    answers: ['booked', 'ordered', 'commanded', 'asked'],
    correct: 1,
  },
  '15': {
    question:
      'Once the plane is in the air, you can ...... your seat belts if you wish.',
    answers: ['undress', 'unfasten', 'unlock', 'untie'],
    correct: 1,
  },
  '16': {
    question: 'I left my last job because I had no ...... to travel.',
    answers: ['place', 'position', 'opportunity', 'possibility'],
    correct: 2,
  },
  '17': {
    question: "It wasn't a bad crash and ...... damage was done to my car.",
    answers: ['little', 'small', 'light', 'mere'],
    correct: 0,
  },
  '18': {
    question: "I'd rather you ...... to her why we can't go.",
    answers: ['would explain', 'explained', 'to explain', 'will explain'],
    correct: 1,
  },
  '19': {
    question: 'This new printer is recommended as being ...... reliable.',
    answers: ['greatly', 'highly', 'strongly', 'readily'],
    correct: 1,
  },
  '20': {
    question:
      'When I realized I had dropped my gloves, I decided to ...... my steps.',
    answers: ['retrace', 'regress', 'resume', 'Return'],
    correct: 0,
  },
}
