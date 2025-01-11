import { IonItem, IonLabel, IonProgressBar } from '@ionic/react'

export const ScoreRow = ({
  label,
  score,
}: {
  label: string
  score: number
}) => (
  <IonItem>
    <IonLabel>{label}</IonLabel>
    <IonLabel style={{ paddingLeft: 15, paddingRight: 15 }}>{score}</IonLabel>
    <IonProgressBar value={score / 10} />
  </IonItem>
)
