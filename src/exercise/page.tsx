import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  useIonRouter,
} from '@ionic/react'
import { Spelling } from './spelling'
import { Route } from 'react-router-dom'
import { Expression } from './expression'
import { Eloquence } from './eloquence'
import { arrowBackOutline } from 'ionicons/icons'
import { Concision } from './concision'
import { Clarity } from './clarity'
import { Diction } from './diction'
import { Pronunciation } from './pronunciation'
import { Association } from './association'

export default function Page() {
  const router = useIonRouter()
  const exercise = router.routeInfo.pathname.split('/').pop()
  return (
    <IonPage>
      <IonContent className={'ion-text-center'}>
        <div
          style={{
            backgroundColor: 'var(--ion-color-primary)',
            height: '30vh',
            borderBottomLeftRadius: '5%',
            borderBottomRightRadius: '5%',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '5vh',
            }}
          >
            <IonButton
              onClick={() => router.goBack()}
              style={{ position: 'absolute', left: 0 }}
            >
              <IonIcon icon={arrowBackOutline} color={'light'} />
            </IonButton>
            <h1
              style={{
                margin: 0,
                textTransform: 'capitalize',
                color: 'white',
                display: 'inline-block',
              }}
            >
              Exercise: {exercise}
            </h1>
          </div>
        </div>
        {/*timer*/}
        {/*Routes start*/}
        <div className={'ion-padding'}>
          <Route path="/exercise/spelling">
            <Spelling />
          </Route>
          <Route path="/exercise/expression">
            <Expression />
          </Route>
          <Route path="/exercise/eloquence">
            <Eloquence />
          </Route>
          <Route path="/exercise/Concision">
            <Concision />
          </Route>
          <Route path="/exercise/Clarity">
            <Clarity />
          </Route>
          <Route path="/exercise/Diction">
            <Diction />
          </Route>
          <Route path="/exercise/Pronunciation">
            <Pronunciation />
          </Route>
          <Route path="/exercise/Association">
            <Association />
          </Route>
        </div>
        {/*Routes end*/}
      </IonContent>
    </IonPage>
  )
}
