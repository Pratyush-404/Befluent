import { Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Switch } from 'react-router'
import posthog from 'posthog-js'

//providers
import AuthUserProvider from './AuthUserProvider'
import { EvalProvider } from './EvalProvider'
import { UserProvider } from './UserContext'

// pages

import './Styles'
import { isDev } from './environment'
import { ExerciseProvider } from './ExerciseContext'
import { SubscriptionProvider } from './subscription/SubscriptionContext'

import MeetingRecorder from './meeting-recorder/page'
import ReportV2 from './report/pageV2'
import { Routes } from './routes'
import { ErrorBoundary } from './error'

setupIonicReact()
if (!isDev)
  posthog.init('phc_Wlvj5AtuECDH5WgimltkX0uqtMKPygoqH8a8LdAX6a3', {
    session_recording: {
      maskAllInputs: false,
      maskInputOptions: {
        password: true,
      },
    },
  })

const App = () => (
  <ErrorBoundary>
    <IonApp>
      <IonReactRouter>
        <Switch>
          {/* Public Routes */}
          <Route exact path={'/meeting-recorder'} component={MeetingRecorder} />
          <Route exact path={'/reportV2/:id/:password?'} component={ReportV2} />

          <AuthUserProvider>
            <IonRouterOutlet>
              <SubscriptionProvider>
                <UserProvider>
                  <EvalProvider>
                    <ExerciseProvider>
                      <Routes />
                    </ExerciseProvider>
                  </EvalProvider>
                </UserProvider>
              </SubscriptionProvider>
            </IonRouterOutlet>
          </AuthUserProvider>
        </Switch>
      </IonReactRouter>
    </IonApp>
  </ErrorBoundary>
)

export default App
