import { ReactNode } from 'react'
import { useLocation } from 'react-router'
import { IonIcon, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { home, school } from 'ionicons/icons'
import aiChat from './ai-chat.svg'

const tabs = [
  { tab: 'index', href: '/', icon: home },
  { tab: 'chat', href: '/chat', img: aiChat },
  { tab: 'dashboard', href: '/dashboard', icon: school },
]
export const Tabs = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  return (
    <IonTabs>
      {children}
      <IonTabBar slot="bottom" style={{ height: '90px' }}>
        {tabs.map(({ tab, href, icon, img }) => (
          <IonTabButton
            key={tab}
            tab={tab}
            href={href}
            selected={location.pathname === href}
          >
            {icon ? <IonIcon icon={icon} /> : <img src={img} alt={img} />}
          </IonTabButton>
        ))}
      </IonTabBar>
    </IonTabs>
  )
}
