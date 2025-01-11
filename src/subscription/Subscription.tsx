import React from 'react'
import { IonButton, IonCard, IonContent, IonPage } from '@ionic/react'
import { isDev } from '../environment'
import { SupportText } from '../support/SupportText'
import { ManageStripeSubscription } from './ManageStripeSubscription'
import { useSubscription } from './SubscriptionContext'

export const Subscription = () => {
  const { state, checkSub } = useSubscription()
  return (
    <IonPage>
      <IonContent className={'ion-text-center'}>
        <h1>Subscription</h1>
        <p>Your Subscription is {state}.</p>
        <ManageStripeSubscription />
        <IonCard>
          {isDev ? (
            <stripe-pricing-table
              pricing-table-id="prctbl_1P8TlpFYJf2Iy7C3xqhovDED"
              publishable-key="pk_test_51OlyWaFYJf2Iy7C3NBBT5k8HKE8ppbjDF8o6TpoyxFD440HiV6lQDEC5k6qikNKTwus6c37nlmBHPd1ukXsnZ8aR005RqVaNWX"
            />
          ) : (
            <stripe-pricing-table
              pricing-table-id="prctbl_1P8UUsFYJf2Iy7C3cnjPSb04"
              publishable-key="pk_live_51OlyWaFYJf2Iy7C3CzD92t0x0R3q9QP52y77H5C27x7l7kRokzGBZdxfWH7YRbviG6HvS3qOngGRtKDh7MliDssu00fwHVZc0J"
            />
          )}
        </IonCard>
        <IonButton onClick={() => checkSub()}>
          Refresh Subscription Status
        </IonButton>
        <SupportText />
      </IonContent>
    </IonPage>
  )
}
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
}
