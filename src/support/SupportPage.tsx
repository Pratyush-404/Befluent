import { IonPage } from '@ionic/react'
import { SupportText } from './SupportText'

export const SupportPage = () => {
  return (
    <IonPage
      className={'ion-margin ion-justify-content-start ion-align-items-center'}
    >
      <h1>Support</h1>
      <img src={'/support.png'} alt="Support" style={{ maxWidth: 320 }} />
      <SupportText />
    </IonPage>
  )
}
