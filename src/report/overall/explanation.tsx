import { IonButton, IonContent, IonIcon, IonModal } from '@ionic/react'
import { levels } from '../../supa-types'
import { levelWords } from '../skills/skills'
import { levelExplanations } from './levelExplanations'
import { levelColorMapping } from '../../journey/levelColorMapping'
import { helpOutline } from 'ionicons/icons'
import { useState } from 'react'

export const Explanation = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <IonButton
        shape="round"
        style={{ marginLeft: 10 }}
        onClick={() => setIsOpen(true)}
      >
        <IonIcon slot="icon-only" icon={helpOutline} />
      </IonButton>
      <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <IonContent className={'ion-padding'}>
          <Block
            heading={'Overall proficiency score'}
            content={
              'The Common European Framework of Reference for Languages (CEFR) is a standardized system to measure and describe language proficiency. It is divided into six levels, grouped into three broad categories: Basic User (A1 and A2), Independent User (B1 and B2), and Proficient User (C1 and C2).'
            }
            background={'var(--ion-color-primary)'}
          />
          {levels.map((level) => (
            <Block
              key={level}
              heading={`${level.toUpperCase()} - Level (${levelWords[level]})`}
              content={levelExplanations[level]}
              background={levelColorMapping[level]}
            />
          ))}
        </IonContent>
      </IonModal>
    </>
  )
}
export const Block = ({
  heading,
  content,
  background,
}: {
  heading: string
  content: string
  background: string
}) => {
  return (
    <div
      style={{
        marginBottom: 30,
        boxShadow: '0px 8px 24px 0px rgba(149, 157, 165, 0.2)',
        borderRadius: 5,
      }}
    >
      <div
        style={{
          background,
          color: 'white',
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 800,
          padding: 12,
          borderStartStartRadius: 5,
          borderStartEndRadius: 5,
        }}
      >
        {heading}
      </div>
      <div style={{ padding: 20 }}>{content}</div>
    </div>
  )
}
