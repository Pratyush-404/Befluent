import { IonPage, IonSpinner } from '@ionic/react'

export const LoadingPage = () => {
  return (
    <IonPage className={'ion-justify-content-center ion-align-items-center'}>
      <IonSpinner />
    </IonPage>
  )
}
