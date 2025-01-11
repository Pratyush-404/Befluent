import { Fragment, useEffect, useState } from 'react'
import {
  IonButton,
  IonIcon,
  IonPage,
  IonProgressBar,
  useIonRouter,
} from '@ionic/react'
import { useAuthUserObject } from '../AuthUserProvider'
import { checkbox } from 'ionicons/icons'
import { supa } from '../../supabase'
import { UserLevel } from '../supa-types'

export default function EvalResults({ next }: { next: () => void }) {
  const { authUser } = useAuthUserObject()
  const router = useIonRouter()
  const [level, setLevel] = useState<UserLevel>()
  const calcLevel = async () => {
    const { data } = await supa
      .from('evaluations')
      .select('*')
      .eq('user_id', authUser.id)
      .not('listen0', 'is', null)
      .not('listen1', 'is', null)
      .not('listen2', 'is', null)
      .not('listen3', 'is', null)
      .not('listen4', 'is', null)
      .not('listen5', 'is', null)
      .not('speak0', 'is', null)
      .not('speak1', 'is', null)
      .single()
    if (!data) return router.push('/test/listen/0')

    // const mcFields = []
    const listenResults: number[] = []
    const speakResults: number[] = []
    const levelToNumber = {
      a1: 1,
      a2: 2,
      b1: 3,
      b2: 4,
      c1: 5,
      c2: 6,
    }
    const numberToLevel = {
      1: 'a1',
      2: 'a2',
      3: 'b1',
      4: 'b2',
      5: 'c1',
      6: 'c2',
    } as const

    for (const key_ in data) {
      const key = key_ as keyof typeof data
      // if (key.startsWith('mc')) {
      //   mcFields.push(data[key] as boolean)
      // } else
      if (
        key === 'listen0' ||
        key === 'listen1' ||
        key === 'listen2' ||
        key === 'listen3' ||
        key === 'listen4' ||
        key === 'listen5'
      ) {
        const val = data[key]
        if (val === null) continue
        else listenResults.push(val ? 6 : 1)
      } else if (key === 'speak0' || key === 'speak1') {
        const val = data[key]
        if (val === null) continue
        else speakResults.push(levelToNumber[val])
      }
    }

    // const mcAverage = mcFields.reduce((a, b) => a + +b, 0) / mcFields.length
    const listenAverage =
      listenResults.reduce((a, b) => a + b) / listenResults.length
    const speakAverage =
      speakResults.reduce((a, b) => a + b) / speakResults.length

    const finalScore = Math.round(
      (listenAverage + speakAverage) / 2
    ) as keyof typeof numberToLevel

    const level = numberToLevel[finalScore]
    await supa.from('users').update({ level }).eq('id', authUser.id)
    setLevel(level)
  }
  useEffect(() => {
    calcLevel()
  }, [])
  const [stepIndex, setStepIndex] = useState(0)
  useEffect(() => {
    const to = setTimeout(() => {
      const next = stepIndex + 1
      if (next == steps.length) {
        //continue
      } else {
        setStepIndex(next)
      }
    }, 1000)
    return () => clearTimeout(to)
  }, [stepIndex])

  const steps = [
    <>Evaluating your listening skills</>,
    <>Evaluating your speaking skills</>,
    <>Your evaluation is complete! Your level is {level}</>,
  ]

  return (
    <IonPage className={'ion-padding'}>
      <h1>Creation of your personal study plan</h1>
      <br />
      <IonProgressBar value={(stepIndex + 1) / steps.length} />
      {steps.map((step, i) => (
        <Fragment key={i}>
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              visibility: stepIndex >= i ? 'visible' : 'hidden',
            }}
          >
            {step}
            <IonIcon icon={checkbox} size={'large'} color={'primary'} />
          </p>
          <br />
        </Fragment>
      ))}
      <IonButton onClick={next}>Continue</IonButton>
    </IonPage>
  )
}
