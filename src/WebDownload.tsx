import { IonAlert } from '@ionic/react'
import { useEffect, useState } from 'react'
import { supa } from '../supabase'

export const WebDownload = ({ messagesLength }: { messagesLength: number }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasSeenBefore, setHasSeenBefore] = useState<boolean>()
  useEffect(() => {
    supa
      .from('notifications_seen')
      .select()
      .eq('notif_id', 1)
      .select('')
      .then((r) => setHasSeenBefore(!!r.data?.length))
  }, [])
  useEffect(() => {
    if (messagesLength > 3 && hasSeenBefore === false) {
      setIsOpen(true)
    }
  }, [messagesLength, hasSeenBefore])
  return (
    <IonAlert
      isOpen={isOpen}
      header={'Save this app to your home screen!'}
      message={
        'Go to Settings / Share and click Install app / Add to Home Screen'
      }
      buttons={[
        {
          text: 'Ok!',
          handler: () => {
            supa.from('notifications_seen').insert({ notif_id: 1 }).then()
            setIsOpen(false)
          },
        },
      ]}
    />
  )
}
