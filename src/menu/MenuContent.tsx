import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react'
import { supa } from '../../supabase'
import React, { useContext } from 'react'
import { UserContext, useUserContext } from '../UserContext'
import { useAuthUserObject } from '../AuthUserProvider'
import {
  barbellOutline,
  callOutline,
  helpCircleOutline,
  languageOutline,
  listOutline,
  notificationsOutline,
  paperPlaneOutline,
  shareOutline,
  timeOutline,
} from 'ionicons/icons'

export default function MenuContent() {
  const { authUser } = useAuthUserObject()
  const { user } = useUserContext()
  const { isAdmin } = useContext(UserContext)

  const menuItems = [
    {
      href: '/reports',
      label: 'Reports',
      icon: listOutline,
    },
    {
      href: '/notifications',
      label: 'Notifications',
      icon: notificationsOutline,
    },
    { href: '/profile', label: 'Profile', icon: languageOutline },
    { href: '/time-goal', label: 'Time Goal', icon: timeOutline },
    { href: '/onboarding', label: 'Onboarding', icon: paperPlaneOutline },
    { href: '/exercises', label: 'Exercises', icon: barbellOutline },
    { href: '/support', label: 'Support', icon: callOutline },
    { href: '/faq', label: 'Help & FAQs', icon: helpCircleOutline },
    { href: '/invite', label: 'Invite a Friend', icon: shareOutline },
    { href: '/subscription', label: 'Manage Subscription' },

    { href: '/auth/change-password', label: 'Change Password' },
  ]
  if (isAdmin)
    menuItems.push({
      href: '/admin-chat-exercises',
      label: 'Admin Chat Exercises',
    })

  return (
    <IonContent>
      <div className="ion-padding">
        <h1 className={'ion-text-left'}>{user.full_name}</h1>
        <p>{authUser.email}</p>
      </div>
      <IonList>
        {menuItems.map((item) => (
          <IonItem key={item.href} routerLink={item.href} detail={false}>
            {item.icon && (
              <IonIcon icon={item.icon} style={{ marginRight: 10 }} />
            )}
            <IonLabel>{item.label}</IonLabel>
          </IonItem>
        ))}
        <IonItem
          onClick={async () => {
            const confirm0 = window.confirm(
              'Are you sure you want to delete your account?'
            )
            if (!confirm0) return
            const confirm1 = window.confirm(
              'Are you really sure you want to delete your account?'
            )
            if (confirm1) {
              const r = await supa.functions.invoke('delete-user')
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              r.data == 'ok' && (await supa.auth.signOut())
            }
          }}
        >
          Delete My Account
        </IonItem>
        <IonItem>
          <IonButton onClick={() => supa.auth.signOut()}>Sign Out</IonButton>
        </IonItem>
      </IonList>
    </IonContent>
  )
}
