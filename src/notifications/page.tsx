import {
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
} from '@ionic/react'
import { LocalNotifications } from '@capacitor/local-notifications'
import { useState } from 'react'
import png from './notifications.png'

export const Page = ({ next }: { next?: () => void }) => {
  const [at, setAt] = useState<string>()
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      className={'ion-justify-content-start ion-align-items-center ion-padding'}
    >
      <img src={png} alt="Reminder" style={{ maxWidth: 320 }} />
      <h1>Reminder</h1>
      <p className={'ion-text-center'}>
        To keep you on track, we'll give you a practice reminder notification
        once a day.
      </p>
      <IonDatetimeButton datetime="reminder" />
      <IonModal keepContentsMounted={true}>
        <IonDatetime
          id="reminder"
          value={at}
          presentation={'time'}
          onIonChange={(e) => e.target.value && setAt(String(e.target.value))}
        />
      </IonModal>
      {at && (
        <IonButton
          onClick={async () => {
            const permissionStatus = await LocalNotifications.checkPermissions()
            if (permissionStatus.display !== 'granted') {
              await LocalNotifications.requestPermissions()
            }
            await LocalNotifications.schedule({
              notifications: [
                {
                  id: 0,
                  title: 'BeFluent Daily Reminder',
                  body: `It's time to practice!`,
                  schedule: {
                    repeats: true,
                    at: new Date(at),
                    every: 'day',
                  },
                },
              ],
            })
            next?.()
          }}
        >
          Save Reminder
        </IonButton>
      )}
    </div>
  )
}
export default Page
