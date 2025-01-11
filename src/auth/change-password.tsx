import { supa } from '../../supabase'
import {
  IonButton,
  IonContent,
  IonInput,
  IonLabel,
  IonPage,
} from '@ionic/react'
import { useState } from 'react'
import { useAuthUserObject } from '../AuthUserProvider'

export const ChangePassword = () => {
  const [input, setInput] = useState('')
  const { authUser } = useAuthUserObject()

  return (
    <IonPage>
      <IonContent className={'ion-padding'}>
        <h1>Change Password</h1>
        <p>Enter your new password:</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" value={authUser.email} readOnly />
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(String(e.target.value))
            }}
          />
          <IonButton
            type="submit"
            onClick={async () => {
              const { error } = await supa.auth.updateUser({
                password: input,
              })
              if (error)
                alert(
                  'There was an error updating your password: ' + error.message
                )
              else alert('Password updated successfully!')
            }}
          >
            Change Password
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}
