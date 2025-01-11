import * as React from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { StreakProgress } from './StreakProgress'
import { LearningProgress } from './LearningProgress'

export const DashboardPage = () => {
  return (
    <IonPage>
      <IonContent className={'ion-padding'}>
        <h1>All Time Progress</h1>
        <StreakProgress />
        <LearningProgress />
      </IonContent>
    </IonPage>
  )
}
