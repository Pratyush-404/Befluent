import TestListen from './pages/test/TestListen'
import TestSpeak from './pages/test/TestSpeak'
import EvalResults from './pages/EvalResults'
import TimeGoal from './pages/TimeGoal'
import Notifications from './notifications/page'
import { useState } from 'react'
import { Redirect } from 'react-router'
import { IonAlert, IonProgressBar } from '@ionic/react'
import { OnboardingChat } from './OnboardingChat'

export const Onboarding = () => {
  const [index, setIndex] = useState(0)
  const next = () => setIndex(index + 1)
  const steps = [
    <IonAlert
      header={'Hello! Nice to meet you. I’m Nora, your AI tutor.'}
      message={
        'Let’s start with just a few questions to help us create a personalized course plan for you! This should take 1-2 mins.'
      }
      isOpen
      buttons={[{ text: 'SOUNDS GOOD!', handler: next }]}
    />,
    <OnboardingChat next={next} />,
    <IonAlert
      header="Evaluation time!"
      isOpen
      message={
        'Thank you for sharing a bit about yourself! We will now conduct a brief evaluation to assess your English proficiency level, which will help us create a tailored curriculum and lesson plan for you. This should take 3-4 mins.'
      }
      buttons={[{ text: 'OK', handler: next }]}
    />,
    <TestListen key={0} id={'0'} next={next} />,
    <TestListen key={1} id={'1'} next={next} />,
    <TestSpeak key={0} id={'0'} next={next} />,
    <TestSpeak key={1} id={'1'} next={next} />,
    <EvalResults next={next} />,
    <TimeGoal next={next} />,
    <Notifications next={next} />,
  ]
  const step = steps[index]
  if (!step) return <Redirect to="/" />
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IonProgressBar value={index / steps.length} />
      </div>
      {step}
    </div>
  )
}
