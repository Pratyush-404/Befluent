import { ChatBase } from './chat/ChatBase'
import { Messages } from './chat/Chat'
import { useState } from 'react'
import { useUserContext } from './UserContext'
import { useIonAlert } from '@ionic/react'
import { chatJson1 } from './supa-functions'

export const OnboardingChat = ({ next }: { next: () => void }) => {
  const { user, setUser } = useUserContext()
  const [presentAlert] = useIonAlert()
  const [stepIndex, setStepIndex] = useState(0)
  const steps: [
    string,
    (text: string) => void,
    string[]?,
    ((input: string) => Promise<[string, string]>)?
  ][] = [
    [
      'Welcome!\nWhat is your name?',
      (full_name) => setUser({ ...user, full_name }),
    ],
    [
      'What’s your native language?',
      (native_language) => setUser({ ...user, native_language }),
    ],
    [
      'What are your goals in learning English?',
      (goals) => setUser({ ...user, goals }),
      ['Work', 'Study', 'Travel', 'Hobby'],
    ],
    [
      'What are your topics of interest?',
      (interests) => setUser({ ...user, interests }),
      ['Business', 'Technology', 'Science', 'Art', 'Sports', 'Music'],
      () =>
        Promise.resolve([
          'GREAT!',
          'We’ll make sure to cover the chosen topics!',
        ]),
    ],
    [
      'What is the most difficult aspect of learning English for you?',
      (challenge) => setUser({ ...user, challenge }),
      [
        "It's hard to find time",
        "It's hard to stay motivated",
        'Remembering what I learned',
        "I'm too nervous to speak",
      ],
      (input: string) =>
        chatJson1([
          {
            role: 'system',
            content: `
            You are an English tutor.
            Examples:
            {[key: userMessage]: [assistantHeader, assistantMessage]}
            "It's hard to find time": [ "Time is precious, and that's why Befluent.ai lessons average just 20 mins long!", "You can pause anytime, and when you're ready to restart, it's super easy to pick from right where you left off!", ], 
            "It's hard to stay motivated": [ 'We all find it hard to stay motivated sometimes! :(', 'We have smart methods to review, and advanced AI tools to track your progress.\n\nMost importantly, our lessons are designed to keep you interested!', ], 
            'Lack of opportunities to speak': [ 'Finding opportunities to practice English is hard!', 'This is why we built Befluent.ai - To make the experience of speaking with someone face to face something you can do anytime, anywhere!', ], 
            'Remembering what I learned': [ "Why learn something if you can't remember it? 😬", "At Befluent.ai, we've built an innovative and well-researched method that will not only help you to learn new words and concepts but to also remember them down the road!", ], 
            "I'm too nervous to speak": [ 'You CAN and WILL build confidence over time 💪', "With Befluent.ai, you can practice conversational English with our AI tutor and exercises.\n\nThe next time you need to speak English, you won't be stuck at 'Hello, How are you?'", ], 
            'English language is too hard': [ 'Befluent.ai is designed for learners of all skill levels!', 'Our thousands of lessons cover all experience levels. We make sure our content is relevant and that concepts are explained clearly for you as per your understanding level!\n\nYou are capable of it, and it WILL be a fun and rewarding experience!']
            
            return JSON: { header: string, message: string }
            `,
          },
          {
            role: 'assistant',
            content:
              'What is the most difficult aspect of learning English for you?',
          },
          { role: 'user', content: input },
        ]).then((r) => {
          return [r.header, r.message]
        }),
    ],
  ]
  const step = steps[stepIndex]

  const [messages, setMessages] = useState<Messages>([
    {
      role: 'assistant',
      content: JSON.stringify({
        feedback: '',
        message: steps[0][0],
        question: '',
      }),
    },
  ])

  const advanceStep = () => {
    const nextStepIndex = stepIndex + 1
    const nextStep = steps[nextStepIndex]
    if (nextStep) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: JSON.stringify({
            feedback: '',
            message: nextStep[0],
            question: '',
          }),
        },
      ])
      setStepIndex(nextStepIndex)
    } else {
      next()
    }
  }

  const send = async (userInput: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: userInput },
    ])
    step[1](userInput)

    if (step[3]) {
      const content = await step[3](userInput)
      await presentAlert({
        header: content[0],
        message: content[1],
        buttons: ['CONTINUE'],
        onDidDismiss: advanceStep,
      })
    } else {
      advanceStep()
    }
  }
  return <ChatBase messages={messages} hints={step[2]} sendCb={send} />
}
