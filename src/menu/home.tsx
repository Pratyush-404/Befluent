import {
  IonButtons,
  IonHeader,
  IonImg,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react'
import React from 'react'
import { useUserContext } from '../UserContext'
import MenuContent from './MenuContent'
import { Journey } from '../journey/journey'
import upgradeNow from './upgrade-now.png'
import { useSubscriptionInactive } from '../subscription/SubscriptionContext'

export const Home = () => {
  const { user } = useUserContext()
  const router = useIonRouter()
  const subscriptionInactive = useSubscriptionInactive()

  return (
    <>
      <IonMenu contentId="main-content">
        <MenuContent />
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Welcome {user.full_name}!</IonTitle>
          </IonToolbar>
        </IonHeader>
        {subscriptionInactive && (
          <div style={{ background: 'var(--ion-color-primary)' }}>
            <IonImg
              src={upgradeNow}
              style={{ maxWidth: 320, margin: '0 auto', cursor: 'pointer' }}
              onClick={() => {
                router.push('/subscription')
              }}
            />
          </div>
        )}
        <Journey />
      </IonPage>
    </>
  )
}
