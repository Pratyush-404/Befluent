import { IonItem, IonLabel, IonList } from '@ionic/react'
import { ScoreRow } from './dashboard/ScoreRow'
import * as React from 'react'

export const Stats = ({
  questionsPracticed,
  correctPercent,
  sessionCount,
  read_score,
  write_score,
  listen_score,
  speak_score,
}: {
  questionsPracticed: number
  correctPercent: number
  sessionCount?: number
  read_score: number
  write_score: number
  listen_score: number
  speak_score: number
}) => {
  return (
    <IonList>
      <IonItem>
        <IonLabel>Questions Practiced</IonLabel>
        <IonLabel>{questionsPracticed}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Correct Percent</IonLabel>
        <IonLabel>{Math.round(correctPercent * 100)}%</IonLabel>
      </IonItem>
      {sessionCount && (
        <IonItem>
          <IonLabel>Session Count</IonLabel>
          <IonLabel>{sessionCount}</IonLabel>
        </IonItem>
      )}
      <ScoreRow label="Read Score" score={read_score} />
      <ScoreRow label="Write Score" score={write_score} />
      <ScoreRow label="Listen Score" score={listen_score} />
      <ScoreRow label="Speak Score" score={speak_score} />
    </IonList>
  )
}
