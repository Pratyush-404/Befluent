import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react'
import png from './invite.png'
import { logoFacebook, logoWhatsapp, share } from 'ionicons/icons'

export default function Page() {
  return (
    <IonPage>
      <IonContent className={'ion-text-center ion-padding'}>
        <img src={png} alt="Invite" style={{ maxWidth: 160 }} />
        <h1>Invite a Friend</h1>
        <p>Introduce Befluent.ai to your friend</p>
        <IonButton
          onClick={() => {
            window.open(
              'https://api.whatsapp.com/send?text=I%20found%20this%20great%20app%20for%20learning%20English%20and%20I%20think%20you%20might%20like%20it%20too.%20Check%20it%20out%20at%20https%3A%2F%2Fbefluent.ai',
              '_blank'
            )
          }}
        >
          <IonIcon icon={logoWhatsapp} style={{ marginRight: 5 }} />
          WhatsApp
        </IonButton>
        <IonButton
          onClick={() => {
            window.open(
              'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbefluent.ai',
              '_blank'
            )
          }}
        >
          <IonIcon icon={logoFacebook} style={{ marginRight: 5 }} />
          Facebook
        </IonButton>
        <IonButton
          onClick={() => {
            navigator.clipboard.writeText('https://befluent.ai')
          }}
        >
          <IonIcon icon={share} style={{ marginRight: 5 }} />
          Copy Link
        </IonButton>
      </IonContent>
    </IonPage>
  )
}
