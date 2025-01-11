import { IonContent, IonPage } from '@ionic/react'
import { Route } from 'react-router-dom'
import { Pronunciation } from './pronunciation'

export default function Page() {
  return (
    <IonPage>
      <IonContent className={'ion-text-center'} color={'light'}>
        <Route path={`${pathBase}/pronunciation`}>
          <Pronunciation
            sentence={'topic of a language course, a particular,'}
            word={'particular'}
          />
        </Route>
      </IonContent>
    </IonPage>
  )
}
const pathBase = '/exercise0'
