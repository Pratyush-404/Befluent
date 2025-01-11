import { useUserContext } from '../UserContext'
import { useState } from 'react'
import { IonButton, IonIcon, IonSpinner } from '@ionic/react'
import { languageOutline } from 'ionicons/icons'
import { supa } from '../../supabase'

export const Translate = ({ fullMessage }: { fullMessage: string }) => {
  const { user } = useUserContext()
  const [translation, setTranslation] = useState('')
  const [translating, setTranslating] = useState(false)
  const nativeLang = user.native_language
  return translation
    ? translation
    : nativeLang && (
        <IonButton
          onClick={async () => {
            setTranslating(true)
            const r = await translate(fullMessage, nativeLang)
            const translation = r.data
            if (translation) setTranslation(translation)
            setTranslating(false)
          }}
          fill="clear"
          disabled={translating}
          style={{ height: 20 }}
        >
          {!translating ? <IonIcon icon={languageOutline} /> : <IonSpinner />}
        </IonButton>
      )
}

async function translate(t: string, nativeLang: string) {
  return supa.functions.invoke<string>('chat', {
    body: [
      {
        role: 'user',
        content: `translate ${t} to ${nativeLang}`,
      },
    ],
  })
}
