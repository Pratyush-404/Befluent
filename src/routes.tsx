import { Route } from 'react-router-dom'
import { Onboarding } from './Onboarding'
import { Home } from './menu/home'
import { ChatPageOuter } from './chat/ChatPageOuter'
import { DashboardPage } from './dashboard/DashboardPage'
import ExercisesPage from './exercises/page'
import ExercisesRec from './exercises/rec/page'
import MenuContent from './menu/MenuContent'
import { ChangePassword } from './auth/change-password'
import Profile from './pages/Profile'
import TimeGoal from './pages/TimeGoal'
import { AdminChatExercises } from './pages/AdminChatExercises'
import { ResultsPage } from './ResultsPage'
import { SupportPage } from './support/SupportPage'
import ExercisePage from './exercise/page'
import Exercise0Page from './exercise0/page'
import NotificationsPage from './notifications/page'
import FAQPage from './faq/page'
import InvitePage from './invite/page'
import { Subscription } from './subscription/Subscription'
import ReportsPage from './reports/page'

export const Routes = () => {
  return (
    <>
      <Route exact path="/onboarding">
        <Onboarding />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/chat/:exercise?" component={ChatPageOuter} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/exercises" exact component={ExercisesPage} />
      <Route path="/exercises/rec" component={ExercisesRec} />
      <Route path="/more" component={MenuContent} />
      <Route path="/auth/change-password">
        <ChangePassword />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/time-goal" component={TimeGoal} />
      <Route path="/admin-chat-exercises" component={AdminChatExercises} />
      <Route path={'/results'} component={ResultsPage} />
      <Route path={'/support'} component={SupportPage} />
      <Route path={'/exercise/:id'} component={ExercisePage} />
      <Route path={'/exercise0/:id'} component={Exercise0Page} />
      <Route path={'/notifications'} component={NotificationsPage} />
      <Route path={'/faq'} component={FAQPage} />
      <Route path={'/invite'} component={InvitePage} />
      <Route path={'/subscription'} component={Subscription} />
      <Route path={'/reports'} component={ReportsPage} />
    </>
  )
}
