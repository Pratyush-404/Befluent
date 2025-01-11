import { tts } from '../../tts'
import { useState } from 'react'
import { IonIcon, IonSpinner } from '@ionic/react'
import { volumeHigh } from 'ionicons/icons'

export const Listen = ({ word }: { word: string }) => {
  const [loading, setLoading] = useState(false)
  if (loading) return <IonSpinner />
  return (
    <IonIcon
      icon={volumeHigh}
      size={'large'}
      onClick={async () => {
        setLoading(true)
        await tts(word)
        setLoading(false)
      }}
      style={{ cursor: 'pointer' }}
    />
  )
}
