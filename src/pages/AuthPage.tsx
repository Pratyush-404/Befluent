import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { IonPage, IonText } from '@ionic/react'
import { supa } from '../../supabase'
import { useEffect } from 'react'
import { Capacitor } from '@capacitor/core'
import { App } from '@capacitor/app'

export default function AuthPage({
  view = 'sign_in',
}: {
  view?: 'sign_in' | 'sign_up'
}) {
  useEffect(() => {
    const handlePromise = App.addListener('appUrlOpen', async (data) => {
      const url = new URL(data.url)
      const params = new URLSearchParams(url.hash.substring(1)) // remove the leading '#'

      await supa.auth.setSession({
        access_token: params.get('access_token') || '',
        refresh_token: params.get('refresh_token') || '',
      })
    })
    return () => {
      handlePromise.then((handle) => handle.remove())
    }
  }, [])
  return (
    <IonPage className={'ion-justify-content-evenly ion-padding'}>
      <div>
        <IonText color={'primary'}>
          <h1>Welcome!</h1>
        </IonText>
        <p style={{ textAlign: 'center' }}>Good to see you again</p>
      </div>
      <Auth
        view={view}
        supabaseClient={supa}
        providers={[]}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#52525b',
              },
            },
          },
        }}
        redirectTo={window.location.origin}
      />
      <div className={'ion-text-center'}>
        <p>Or Continue with</p>
        <Google
          onClick={async () => {
            await supa.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo,
              },
            })
          }}
        />
      </div>
    </IonPage>
  )
}
const redirectTo =
  Capacitor.getPlatform() === 'web'
    ? window.location.origin
    : 'ai.befluent://auth'

const Google = ({ onClick }: { onClick: () => void }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    cursor={'pointer'}
  >
    <path
      d="M36.3412 16.7365H34.9987V16.6673H19.9987V23.334H29.4179C28.0437 27.2148 24.3512 30.0007 19.9987 30.0007C14.4762 30.0007 9.9987 25.5231 9.9987 20.0007C9.9987 14.4782 14.4762 10.0007 19.9987 10.0007C22.5479 10.0007 24.867 10.9623 26.6329 12.5332L31.347 7.81898C28.3704 5.04482 24.3887 3.33398 19.9987 3.33398C10.7945 3.33398 3.33203 10.7965 3.33203 20.0007C3.33203 29.2048 10.7945 36.6673 19.9987 36.6673C29.2029 36.6673 36.6654 29.2048 36.6654 20.0007C36.6654 18.8832 36.5504 17.7923 36.3412 16.7365Z"
      fill="#FFC409"
    />
    <path
      d="M5.25391 12.2432L10.7297 16.259C12.2114 12.5907 15.7997 10.0007 19.9989 10.0007C22.5481 10.0007 24.8672 10.9623 26.6331 12.5332L31.3472 7.81898C28.3706 5.04482 24.3889 3.33398 19.9989 3.33398C13.5972 3.33398 8.04557 6.94815 5.25391 12.2432Z"
      fill="#FF3D00"
    />
    <path
      d="M20.0016 36.6672C24.3066 36.6672 28.2182 35.0197 31.1757 32.3406L26.0174 27.9756C24.2878 29.2909 22.1744 30.0023 20.0016 30.0006C15.6666 30.0006 11.9857 27.2364 10.5991 23.3789L5.16406 27.5664C7.9224 32.9639 13.5241 36.6672 20.0016 36.6672Z"
      fill="#2DD36F"
    />
    <path
      d="M36.3425 16.7352H35V16.666H20V23.3327H29.4192C28.7618 25.1797 27.5778 26.7937 26.0133 27.9752L26.0158 27.9735L31.1742 32.3385C30.8092 32.6702 36.6667 28.3327 36.6667 19.9993C36.6667 18.8818 36.5517 17.791 36.3425 16.7352Z"
      fill="#1976D2"
    />
  </svg>
)
